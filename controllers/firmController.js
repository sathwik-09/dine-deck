const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

  const upload = multer({storage: storage});

const addFirm = async(req,res) => {
  try {
    const {firmName, area, category, cuisines, offer} = req.body;

    const image = req.file? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor) res.status(404).json({message: "Vendor not found"});

    const firm = new Firm({
      firmName, area, category, cuisines, offer, image, vendor: vendor._id
    })
    const savedFirms = await firm.save();
    vendor.firm.push(savedFirms);
    await vendor.save();

    return res.status(200).json({message: "Firm added successfully"});
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  } 
}

const getAllFirms = async(req, res) => {
  try {
    const firms = await Firm.find().populate('vendor');
    res.json({firms});
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  }
}

const getFirmById = async(req, res) => {
  const firmId = req.params.id;
  try {
    const firm = await Firm.findById(firmId);
    if(!firm) return res.status(404).json({message: "Firm not found"});
    res.status(200).json({firm});
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  }
}

module.exports = {addFirm: [upload.single('image'), addFirm]}