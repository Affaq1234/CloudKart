const express = require("express");
const order = require("../Controllers/OrderController");

const router = express.Router();

router.post("/", order.createOrder);
router.get("/", order.getOrders);
router.get("/:id", order.getOrderById);
router.put("/:id", order.updateOrder);
router.delete("/:id", order.deleteOrder);

module.exports = router;
