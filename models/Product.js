const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName:{
      type: String,
      required: true
    },
    price:{
      type: String,
      required: true
    },
    category:{
      type: [
        {
          type: String,
          enum: ["veg", "non-veg"]
        }
      ]
    },
    image:{
      type: String
    },
    bestSeller:{
      type: String,
    },
    description: {
      type: String
    },
    firm : [{
      type: Schema.Types.ObjectId,
      ref: 'Firm'
    }]
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;