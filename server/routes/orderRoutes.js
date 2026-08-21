const router = require("express").Router();
const order = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, order.createOrder);
router.get("/", auth, order.getOrders);

module.exports = router;
