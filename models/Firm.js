const mongoose = require("mongoose");

const FirmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true
  },
  area:{
    type: String,
    required: true
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"]
      }
    ]
  },
  cuisines: {
    type: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "italian", "chinese"]
      }
    ]
  },
  offer: {
    type: String
  },
  image: {
    type: String
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    }
  ]
})

const Firm = mongoose.model("Firm", FirmSchema);

module.exports = Firm;