const express = require("express");
const firmController = require("../controllers/firmController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken").default;

router.post("/add-firm", verifyToken, firmController.addFirm);

module.exports = router;
