import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, CreditCard, FlaskConical } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getPaymentConfig, createCheckoutSession, sandboxPay } from "../api/api";

function formatCardNumber(value) {
    return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
    const { cartItems, totalPrice, refreshCart } = useCart();
    const navigate = useNavigate();

    const [liveStripe, setLiveStripe] = useState(false);
    const [checkingConfig, setCheckingConfig] = useState(true);

    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getPaymentConfig()
            .then((res) => setLiveStripe(Boolean(res.data.liveStripe)))
            .catch(() => setLiveStripe(false))
            .finally(() => setCheckingConfig(false));
    }, []);

    const handleLivePayment = async () => {
        setLoading(true);
        setError("");
        try {
            const items = cartItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity }));
            const res = await createCheckoutSession(items);
            window.location.href = res.data.url;
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login", { state: { from: "/checkout" } });
                return;
            }
            setError(err.friendlyMessage || "Couldn't start checkout. Please try again.");
            setLoading(false);
        }
    };

    const handleSandboxPayment = async (e) => {
        e.preventDefault();
        setError("");

        const digits = card.number.replace(/\D/g, "");
        if (digits.length < 13) {
            setError("Enter a valid card number.");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
            setError("Enter the expiry as MM/YY.");
            return;
        }
        if (!/^\d{3,4}$/.test(card.cvc)) {
            setError("Enter a valid CVC.");
            return;
        }

        setLoading(true);

        // Simulate real processing latency for an authentic feel
        await new Promise((r) => setTimeout(r, 900));

        try {
            const items = cartItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity }));
            const res = await sandboxPay(items, card);
            await refreshCart?.();
            navigate(`/checkout/success?order_id=${res.data.orderId}`);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login", { state: { from: "/checkout" } });
                return;
            }
            setError(err.friendlyMessage || err.response?.data?.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-display font-semibold text-espresso mb-4">Checkout</h2>
                <p className="text-muted mb-6">Your cart is empty.</p>
                <Link to="/menu" className="btn-primary">Browse the menu</Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-display font-semibold text-espresso mb-8">Checkout</h2>

            <div className="bg-paper rounded-2xl border border-coffee/10 p-6 mb-6">
                <h3 className="eyebrow mb-4">Order summary</h3>
                <ul className="divide-y divide-coffee/10">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between py-3 text-sm">
                            <span className="text-coffee/80">{item.name} <span className="text-muted">× {item.quantity}</span></span>
                            <span className="font-medium text-espresso">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-coffee/10">
                    <span className="font-medium text-espresso">Total</span>
                    <span className="text-2xl font-display font-semibold text-espresso">${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            {checkingConfig ? (
                <div className="h-32 rounded-2xl bg-coffee/5 animate-pulse" />
            ) : liveStripe ? (
                <>
                    {error && (
                        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4 mb-6 text-sm">{error}</p>
                    )}
                    <button onClick={handleLivePayment} disabled={loading} className="btn-primary w-full">
                        {loading ? "Redirecting to payment…" : `Pay · $${totalPrice.toFixed(2)}`}
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-xs text-muted mt-4">
                        <Lock size={12} /> Payments are processed securely by Stripe
                    </p>
                </>
            ) : (
                <div className="bg-paper rounded-2xl border border-coffee/10 p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-clay-50 text-clay-700 px-2.5 py-1 rounded-full">
                            <FlaskConical size={11} /> Sandbox mode
                        </span>
                        <span className="text-xs text-muted">No real charge will be made</span>
                    </div>

                    {error && (
                        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg py-2.5 px-4 mb-5 text-sm">{error}</p>
                    )}

                    <form onSubmit={handleSandboxPayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-coffee/80 mb-1.5">Cardholder name</label>
                            <input
                                value={card.name}
                                onChange={(e) => setCard({ ...card, name: e.target.value })}
                                required
                                className="input-field"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-coffee/80 mb-1.5">Card number</label>
                            <div className="relative">
                                <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                                <input
                                    value={card.number}
                                    onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                                    required
                                    inputMode="numeric"
                                    className="input-field pl-10"
                                    placeholder="4242 4242 4242 4242"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-coffee/80 mb-1.5">Expiry</label>
                                <input
                                    value={card.expiry}
                                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                                    required
                                    inputMode="numeric"
                                    className="input-field"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-coffee/80 mb-1.5">CVC</label>
                                <input
                                    value={card.cvc}
                                    onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                    required
                                    inputMode="numeric"
                                    className="input-field"
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                            {loading ? "Processing payment…" : `Pay · $${totalPrice.toFixed(2)}`}
                        </button>
                    </form>

                    <div className="mt-5 pt-5 border-t border-coffee/10 text-xs text-muted space-y-1">
                        <p className="flex items-center gap-1.5"><Lock size={12} /> This is a sandbox payment form for testing — no real card is charged.</p>
                        <p><strong className="text-coffee/70">4242 4242 4242 4242</strong> → approved · <strong className="text-coffee/70">4000 0000 0000 0002</strong> → declined</p>
                        <p>Any future expiry date and any 3-digit CVC.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
