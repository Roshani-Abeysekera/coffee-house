const router = require("express").Router();
const auth = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password", auth.resetPassword);
router.get("/profile", authMiddleware, auth.profile);
router.get("/seed-admin", auth.seedAdmin);

module.exports = router;
