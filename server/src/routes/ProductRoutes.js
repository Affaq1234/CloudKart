const express = require("express");
const product = require("../controllers/ProductController");

const router = express.Router();

router.post("/", product.createProduct);
router.get("/", product.getProducts);
router.get("/search", product.searchProducts);
router.get("/:id", product.getProductById);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
