const db = require("../config/db");
const { getStripe } = require("../utils/stripeClient");
const crypto = require("crypto");

const NOT_CONFIGURED_MESSAGE =
    "Payments aren't configured yet. Add STRIPE_SECRET_KEY to server/.env (see .env.example) using a free Stripe test-mode key from https://dashboard.stripe.com/test/apikeys.";

// Tells the frontend whether real Stripe is configured, so it can decide
// between the live Stripe Checkout redirect and the built-in sandbox flow
// (which needs no external account and works immediately).
exports.getPaymentConfig = (req, res) => {
    res.json({ liveStripe: Boolean(getStripe()) });
};

// Looks up real prices for a list of {product_id, quantity} from the
// database - shared by both the sandbox and live payment paths so prices
// are never trusted from the client.
async function resolveLineItems(items) {
    const resolved = [];

    for (const item of items) {
        const quantity = Math.max(1, Math.min(50, parseInt(item.quantity, 10) || 1));

        const result = await db.query(
            'SELECT id, name, price, image FROM "MenuItem" WHERE id = $1',
            [item.product_id]
        );

        const product = result.rows[0];
        if (!product) continue;

        resolved.push({ id: product.id, name: product.name, price: Number(product.price), quantity });
    }

    return resolved;
}

// Simple Luhn checksum - the same algorithm every real card network uses
// to catch typos before ever contacting a payment processor.
function passesLuhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// A self-contained "sandbox" payment processor - no external account
// needed. It follows the same well-known test-card numbers real gateways
// like Stripe use, so the experience is authentic and testable immediately:
//   4242 4242 4242 4242  -> approved
//   4000 0000 0000 0002  -> declined
//   anything else Luhn-valid -> approved
exports.createSandboxPayment = async (req, res) => {
    try {
        const { items, card } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        if (!card?.number || !card?.expiry || !card?.cvc) {
            return res.status(400).json({ message: "Card details are incomplete" });
        }

        const digits = card.number.replace(/\D/g, "");

        if (!passesLuhnCheck(digits)) {
            return res.status(402).json({ message: "Card number is invalid.", declined: true });
        }

        if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
            return res.status(402).json({ message: "Expiry date is invalid.", declined: true });
        }

        const [expMonth, expYear] = card.expiry.split("/").map(Number);
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (
            expMonth < 1 || expMonth > 12 ||
            expYear < currentYear ||
            (expYear === currentYear && expMonth < currentMonth)
        ) {
            return res.status(402).json({ message: "Card has expired.", declined: true });
        }

        if (!/^\d{3,4}$/.test(card.cvc)) {
            return res.status(402).json({ message: "CVC is invalid.", declined: true });
        }

        // Known "decline" test number, mirroring Stripe's own test-card conventions
        if (digits === "4000000000000002") {
            return res.status(402).json({ message: "Your card was declined.", declined: true });
        }

        const lineItems = await resolveLineItems(items);

        if (lineItems.length === 0) {
            return res.status(400).json({ message: "None of the items in your cart could be found" });
        }

        const totalPrice = lineItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const sandboxRef = "sandbox_" + crypto.randomBytes(8).toString("hex");

        const orderResult = await db.query(
            `INSERT INTO orders(user_id, total_price, status, stripe_session_id)
             VALUES ($1, $2, 'paid', $3) RETURNING id`,
            [req.user.id, totalPrice, sandboxRef]
        );

        const orderId = orderResult.rows[0].id;

        for (const item of lineItems) {
            await db.query(
                `INSERT INTO order_items(order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.id, item.quantity, item.price]
            );
        }

        await db.query("DELETE FROM cart_items WHERE user_id = $1", [req.user.id]);

        res.json({ message: "Payment approved", orderId });
    } catch (error) {
        console.error("createSandboxPayment Error:", error);
        res.status(500).json({ message: "Couldn't process payment. Please try again." });
    }
};

// Creates a Stripe Checkout Session for the items in the user's cart.
// Prices are always looked up from the database - the client only sends
// product IDs and quantities, never trusted price values.
exports.createCheckoutSession = async (req, res) => {
    const stripe = getStripe();

    if (!stripe) {
        return res.status(503).json({ message: NOT_CONFIGURED_MESSAGE });
    }

    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Look up each product fresh from the database (source of truth for price)
        const lineItems = [];
        const orderItemsMeta = [];

        for (const item of items) {
            const quantity = Math.max(1, Math.min(50, parseInt(item.quantity, 10) || 1));

            const result = await db.query(
                'SELECT id, name, price, image FROM "MenuItem" WHERE id = $1',
                [item.product_id]
            );

            const product = result.rows[0];
            if (!product) continue;

            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: product.name },
                    unit_amount: Math.round(Number(product.price) * 100),
                },
                quantity,
            });

            orderItemsMeta.push({ id: product.id, q: quantity, p: Number(product.price) });
        }

        if (lineItems.length === 0) {
            return res.status(400).json({ message: "None of the items in your cart could be found" });
        }

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: lineItems,
            success_url: `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/checkout/cancel`,
            customer_email: req.user.email || undefined,
            metadata: {
                userId: String(req.user.id),
                items: JSON.stringify(orderItemsMeta),
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("createCheckoutSession Error:", error);
        res.status(500).json({ message: "Couldn't start checkout. Please try again." });
    }
};

// Called by the frontend after Stripe redirects back to /checkout/success.
// Verifies the session actually belongs to this user and was paid, then
// creates the order (idempotently - a session can only create one order).
exports.confirmSession = async (req, res) => {
    const stripe = getStripe();

    if (!stripe) {
        return res.status(503).json({ message: NOT_CONFIGURED_MESSAGE });
    }

    try {
        const { sessionId } = req.params;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session || session.metadata?.userId !== String(req.user.id)) {
            return res.status(403).json({ message: "This checkout session doesn't belong to you" });
        }

        if (session.payment_status !== "paid") {
            return res.status(402).json({ message: "Payment was not completed", status: session.payment_status });
        }

        // Idempotency: if we've already recorded an order for this session, return it
        const existing = await db.query(
            "SELECT * FROM orders WHERE stripe_session_id = $1",
            [sessionId]
        );

        if (existing.rows[0]) {
            return res.json({ message: "Order already recorded", orderId: existing.rows[0].id });
        }

        const items = JSON.parse(session.metadata.items || "[]");
        const totalPrice = (session.amount_total || 0) / 100;

        const orderResult = await db.query(
            `INSERT INTO orders(user_id, total_price, status, stripe_session_id)
             VALUES ($1, $2, 'paid', $3) RETURNING id`,
            [req.user.id, totalPrice, sessionId]
        );

        const orderId = orderResult.rows[0].id;

        for (const item of items) {
            await db.query(
                `INSERT INTO order_items(order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.id, item.q, item.p]
            );
        }

        // Clear the user's cart now that the order has been placed
        await db.query("DELETE FROM cart_items WHERE user_id = $1", [req.user.id]);

        res.json({ message: "Payment confirmed", orderId });
    } catch (error) {
        console.error("confirmSession Error:", error);
        res.status(500).json({ message: "Couldn't confirm your payment. Please contact support." });
    }
};
