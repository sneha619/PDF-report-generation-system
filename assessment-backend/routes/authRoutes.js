const express = require("express");
const router = express.Router();
const { signup, login, getCurrentUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
