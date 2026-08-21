const db = require("../config/db");

// Get all menu items
exports.getMenu = async (req, res) => {
    try {
        const menu = await db.query(
            'SELECT * FROM "MenuItem" ORDER BY id ASC'
        );

        res.json(menu.rows);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Failed to fetch menu items" });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image_url } = req.body;

        const result = await db.query(
            `INSERT INTO "MenuItem"(name, description, price, category, image)
             VALUES($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, description, price, category, image_url]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: "Failed to add menu item" });
    }
};
