const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, passwordHash });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully", admin: { id: newAdmin._id, username: newAdmin.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-passwordHash");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-passwordHash");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.passwordHash = await bcrypt.hash(password, 10);
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-passwordHash");
    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated successfully", updatedAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUploadSignature = (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUD_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      api_key: process.env.CLOUD_API_KEY,
      cloud_name: process.env.CLOUD_NAME,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={addAdmin,getAdmins,loginAdmin,getAdminById,updateAdmin,deleteAdmin,getUploadSignature}