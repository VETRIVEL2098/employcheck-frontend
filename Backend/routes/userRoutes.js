const express = require("express");
const { loginUser, getUsers,getUserById,updateUserStatus } = require("../controllers/userController");
const { authenticateToken,requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public route
router.post("/login", loginUser);

// Protected route 
router.get("/", authenticateToken, getUsers);
router.get("/:id",authenticateToken, getUserById);
router.post("/statuschange",authenticateToken,requireAdmin,updateUserStatus); 
module.exports = router;