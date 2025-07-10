const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firm: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
});



const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;