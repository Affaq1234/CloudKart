const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { orderKey, name, address, whatsapp, items } = req.body;
    const existingOrder = await Order.findOne({ orderKey });
    if (existingOrder) {
      return res.status(400).json({ message: "Order key already exists" });
    }
    const newOrder = new Order({ orderKey, name, address, whatsapp, items });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { name, address, whatsapp, items, status } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (whatsapp) updateData.whatsapp = whatsapp;
    if (items) updateData.items = items;
    if (status) updateData.status = status;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("items.productId");
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated successfully", updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={deleteOrder,updateOrder,getOrderById,getOrders,createOrder};