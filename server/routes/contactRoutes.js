const router = require("express").Router();
const contact = require("../controllers/contactController");

router.post("/", contact.sendContactMessage);

module.exports = router;
