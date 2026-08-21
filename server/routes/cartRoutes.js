const router = require("express").Router();
const cart = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, cart.addToCart);
router.get("/", auth, cart.getCart);
router.delete("/:id", auth, cart.removeFromCart);
router.delete("/", auth, cart.clearCart);

module.exports = router;
