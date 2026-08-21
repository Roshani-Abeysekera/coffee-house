const router = require("express").Router();
const menu = require("../controllers/menuController");

router.get("/", menu.getMenu);
router.post("/", menu.addMenuItem);

module.exports = router;