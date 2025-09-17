const express = require("express");
const admin = require("../controllers/AdminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/login", admin.loginAdmin);

router.post("/", authMiddleware, admin.addAdmin);
router.get("/", authMiddleware, admin.getAdmins);
router.get("/:id", authMiddleware, admin.getAdminById);
router.put("/:id", authMiddleware, admin.updateAdmin);
router.delete("/:id", authMiddleware, admin.deleteAdmin);
router.get("/upload/signature", authMiddleware, admin.getUploadSignature);

module.exports = router;
