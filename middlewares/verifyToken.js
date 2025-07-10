const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if(!token) res.status(400).json({error: "Token is required"});
  try{
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const vendor = await Vendor.findById(decoded.vendorId);
    if(!vendor) return res.status(404).json({error: "Vendor not found"});
    req.vendorId = vendor._id;
    next();
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({error: "Invalid Token"})
  }
}

module.exports = verifyToken;