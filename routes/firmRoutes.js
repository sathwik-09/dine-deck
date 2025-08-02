const express = require("express");
const { addFirm } = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/add-firm", verifyToken, addFirm);

module.exports = router;