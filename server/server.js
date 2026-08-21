require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

// Root + health check. /health also verifies the database connection so
// the frontend can distinguish "backend is down" from "backend is up but
// can't reach the database" - the two most common setup issues.
app.get("/", (req, res) => res.json({ message: "Coffeehouse API is running. Try /health or /api/menu." }));
app.get("/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({ status: "ok", database: "connected" });
    } catch (err) {
        res.status(503).json({ status: "degraded", database: "disconnected", error: err.message });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payments", paymentRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

// Generic error handler - makes sure unexpected errors still return JSON
// (not an HTML stack trace page) and get logged clearly.
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Unexpected server error" });
});

async function start() {
    // Check the database connection up front so a misconfigured .env fails
    // loudly and clearly, instead of every request quietly 500-ing later.
    try {
        await db.query("SELECT 1");
        console.log("✅ Database connection OK");
    } catch (err) {
        console.error("\n❌ Could not connect to the database.");
        console.error("   " + err.message);
        console.error("\n   Checklist:");
        console.error("   1. Is PostgreSQL running? (Windows: services.msc → postgresql-x64-14 → Running)");
        console.error("   2. Does server/.env exist (copied from .env.example)?");
        console.error("   3. Does DATABASE_URL in server/.env have the correct password and database name?");
        console.error("   4. Have you run `npm run migrate:deploy` and `npm run seed`?");
        console.error("\n   The server will still start, but every request that touches the database will fail until this is fixed.\n");
    }

    app.listen(PORT, () => {
        console.log(`Coffeehouse API running on http://localhost:${PORT}`);
    });
}

start();

module.exports = app;
