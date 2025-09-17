const { create } = require("../models/Admin");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, category, images, price } = req.body;
    const newProduct = new Product({ name, category, images, price });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, images, price } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (images) updateData.images = images;
    if (price) updateData.price = price;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" } // case-insensitive partial match
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={createProduct,getProductById,getProducts,updateProduct,deleteProduct,searchProducts}