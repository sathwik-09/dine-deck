const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");


dotenv.config();


const venderRegister = async(req, res) => {
    const { username, email, password } = req.body;
    try{
      const vendorEmail = await Vendor.findOne({ email });
      if(vendorEmail){
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newVender = new Vendor({ username, email, password: hashedPassword });
      await newVender.save();
      res.status(201).json({ message: "Vendor registered successfully" });
    }
    catch(err){
      res.status(500).json({ message: "Internal server error" });
    }
};

const vendorLogin = async (req,res) => {
  const {email, password} = req.body;
  try{
    const vendor = await Vendor.findOne({email});
    if((!vendor) || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({message: "Email or password is incorrect"})
    }
    const token = jwt.sign({vendorId: vendor._id}, process.env.JWT_KEY, {expiresIn: "1h"});
    res.status(200).json({success: "Login Successful", token});
  }
  catch(err) {
    res.status(400).json("Error");
  }
}

module.exports = {
  venderRegister,
  vendorLogin
};
