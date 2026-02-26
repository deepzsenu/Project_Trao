const express = require("express");

const router = express.Router();
const projectRoutes = require("./projectRoutes");


// Health route
router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

// Auth routes
router.use("/auth", require("./authRoutes"));

router.use("/projects", projectRoutes);
module.exports = router;