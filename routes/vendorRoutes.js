const vendorController = require("../controllers/vendorController");
const express = require("express");
const router = express.Router();

router.post("/register", vendorController.venderRegister);
router.post("/login", vendorController.vendorLogin);

module.exports = router;