const db = require("../config/db");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const userId = req.user.id;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if item already exists in cart
    const existing = await db.query(
      `SELECT * FROM cart_items WHERE user_id=$1 AND product_id=$2`,
      [userId, product_id]
    );

    if (existing.rows.length > 0) {
      const newQty = existing.rows[0].quantity + (quantity || 1);

      const result = await db.query(
        `UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *`,
        [newQty, existing.rows[0].id]
      );

      return res.json(result.rows[0]);
    } else {
      const result = await db.query(
        `INSERT INTO cart_items(user_id, product_id, quantity)
         VALUES($1, $2, $3) RETURNING *`,
        [userId, product_id, quantity || 1]
      );

      return res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("addToCart Error:", err);
    res.status(500).json({ message: "Server error adding to cart" });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.id, c.product_id, c.quantity, m.name, m.price, m.image
       FROM cart_items c
       JOIN "MenuItem" m ON c.product_id = m.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("getCart Error:", err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    await db.query(
      `DELETE FROM cart_items WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("removeFromCart Error:", err);
    res.status(500).json({ message: "Server error removing item" });
  }
};

// Clear the entire cart for the logged-in user
exports.clearCart = async (req, res) => {
  try {
    await db.query(`DELETE FROM cart_items WHERE user_id = $1`, [req.user.id]);

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("clearCart Error:", err);
    res.status(500).json({ message: "Server error clearing cart" });
  }
};
