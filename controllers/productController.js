const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const addProduct = async(req, res) => {
  try {
    const {productName, price, category, bestSeller, description} = req.body;
    const image = req.file? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if(!firm) res.status(404).json({message: "Firm not found"});

    const product = new Product({
      productName, price, category, description, bestSeller, image, firm: firm._id
    })
    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();

    return res.status(200).json({message: "Product added successfully"}, savedProduct);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  } 
}

const getProductByFirmId = async(req, res) => {
  try{
    const firmId = req.params.firmId;
    const firm = await Firm.find(firmId);
    if(!firm) res.status(404).json({message: "Firm not found"});
    const products = await Product.find({firm: firmId});
    return res.status(200).json({message: "Product fetched successfully"}, products);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Internal server error"}, getProductByFirmId);
  }
}


module.exports = {
  addProduct : [upload.single('image'), addProduct]
};