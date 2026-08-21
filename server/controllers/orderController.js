const db = require("../config/db");

exports.createOrder = async (req, res) => {
    try {
        const { items, total_price } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must include at least one item" });
        }

        const order = await db.query(
            `INSERT INTO orders(user_id, total_price)
             VALUES ($1, $2) RETURNING *`,
            [req.user.id, total_price]
        );

        const orderId = order.rows[0].id;

        for (const item of items) {
            await db.query(
                `INSERT INTO order_items(order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        res.status(201).json({ message: "Order created", orderId });
    } catch (error) {
        console.error("createOrder Error:", error);
        res.status(500).json({ message: "Server error creating order" });
    }
};

// Returns the logged-in user's order history, each with its line items
exports.getOrders = async (req, res) => {
    try {
        const ordersResult = await db.query(
            `SELECT id, total_price, status, created_at
             FROM orders
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [req.user.id]
        );

        const orders = ordersResult.rows;

        for (const order of orders) {
            const itemsResult = await db.query(
                `SELECT oi.quantity, oi.price, m.name, m.image
                 FROM order_items oi
                 JOIN "MenuItem" m ON m.id = oi.product_id
                 WHERE oi.order_id = $1`,
                [order.id]
            );

            order.items = itemsResult.rows;
        }

        res.json(orders);
    } catch (error) {
        console.error("getOrders Error:", error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};
