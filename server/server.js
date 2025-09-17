const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require('./src/config/db.js');

const adminRoutes = require('./src/routes/AdminRoutes.js');
const productRoutes = require("./src/routes/productRoutes.js");
const orderRoutes = require("./src/routes/OrderRoutes.js");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API running");
});
app.use('/admin',adminRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
