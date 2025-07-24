const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");


dotenv.config();


const vendorRegister = async(req, res) => {
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
      console.error(err);
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
    res.status(200).json({message: "Login Successful", token});
  }
  catch(err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.json({vendors});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId);
    if(!vendor) {
      return res.status(404).json({error : "Vendor does not exist"});
    }
    res.status(200).json({vendor});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById
};
