const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

router.get("/", async (req, res) => {
    const items = await Menu.find();
    res.json(items);
});

module.exports = router;