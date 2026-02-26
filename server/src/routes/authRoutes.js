const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/me", protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;