const router = require("express").Router();
const payment = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");

router.get("/config", payment.getPaymentConfig);
router.post("/sandbox-pay", auth, payment.createSandboxPayment);
router.post("/create-session", auth, payment.createCheckoutSession);
router.get("/confirm/:sessionId", auth, payment.confirmSession);

module.exports = router;
