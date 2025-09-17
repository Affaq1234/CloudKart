const mongoose = require("mongoose");
const orderItemSchema = require("./OrderItem");

const orderSchema = new mongoose.Schema({
  orderKey: { type: String, required: true, unique: true }, // random tracking key
  name: { type: String, required: true },      // customer name
  address: { type: String, required: true },   // delivery address
  whatsapp: { type: String, required: true },  // WhatsApp number
  items: { type: [orderItemSchema], required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Delivered","Approved","Cancelled"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
