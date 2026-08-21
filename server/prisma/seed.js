/**
 * Seeds the database with a demo user and the coffee shop's menu.
 * Run with: npm run seed  (from the server/ directory)
 */
require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../config/db");

const menuItems = [
    { name: "Espresso", description: "Strong and bold single shot.", price: 3.0, image: "/images/espresso.jpg", category: "Hot Coffee" },
    { name: "Latte", description: "Espresso with silky steamed milk.", price: 4.0, image: "/images/latte.jpg", category: "Hot Coffee" },
    { name: "Cappuccino", description: "Rich espresso with thick foam.", price: 4.5, image: "/images/cappuccino.jpg", category: "Hot Coffee" },
    { name: "Americano", description: "Espresso diluted with hot water.", price: 3.5, image: "/images/americano.jpg", category: "Hot Coffee" },
    { name: "Mocha", description: "Chocolate, espresso & steamed milk.", price: 5.0, image: "/images/mocha.jpg", category: "Hot Coffee" },
    { name: "Flat White", description: "Velvety microfoam & espresso.", price: 4.5, image: "/images/flat-white.jpg", category: "Hot Coffee" },
    { name: "Macchiato", description: "Espresso marked with foam.", price: 3.5, image: "/images/macchiato.jpg", category: "Hot Coffee" },
    { name: "Iced Coffee", description: "Chilled brewed coffee over ice.", price: 4.0, image: "/images/iced-coffee.jpg", category: "Cold Coffee" },
    { name: "Cold Brew", description: "Slow-steeped smooth cold coffee.", price: 4.5, image: "/images/cold-brew.jpg", category: "Cold Coffee" },
    { name: "Caramel Latte", description: "Creamy latte with caramel.", price: 5.0, image: "/images/caramel-latte.jpg", category: "Cold Coffee" },
    { name: "Matcha Latte", description: "Premium green tea & milk.", price: 5.0, image: "/images/matcha-latte.jpg", category: "Specialty" },
    { name: "Chai Latte", description: "Spiced tea with steamed milk.", price: 4.5, image: "/images/chai-latte.jpg", category: "Specialty" },
    { name: "Affogato", description: "Vanilla ice cream & espresso.", price: 6.0, image: "/images/affogato.jpg", category: "Specialty" },
];

async function seedUser() {
    const hashedPassword = await bcrypt.hash("password", 10);

    await db.query(
        `INSERT INTO users (name, email, password)
         VALUES ('Test User', 'test@test.com', $1)
         ON CONFLICT (email) DO NOTHING;`,
        [hashedPassword]
    );

    console.log("Demo user seeded (test@test.com / password)");
}

async function seedMenu() {
    const { rows } = await db.query('SELECT COUNT(*)::int AS count FROM "MenuItem"');

    if (rows[0].count > 0) {
        console.log("Menu already has items, skipping menu seed.");
        return;
    }

    for (const item of menuItems) {
        await db.query(
            `INSERT INTO "MenuItem" (name, description, price, image, category)
             VALUES ($1, $2, $3, $4, $5)`,
            [item.name, item.description, item.price, item.image, item.category]
        );
    }

    console.log(`Seeded ${menuItems.length} menu items.`);
}

async function main() {
    await seedUser();
    await seedMenu();
}

main()
    .catch((err) => {
        console.error("Seeding failed:", err);
        process.exit(1);
    })
    .finally(async () => {
        await db.end();
    });
