const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Smart Watch", "Headphone", "Airpods", "Accessories"], 
    required: true 
  },
  images: { type: [String], required: true }, // multiple Cloudinary links
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
