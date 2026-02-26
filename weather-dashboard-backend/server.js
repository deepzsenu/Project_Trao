
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cities", require("./routes/city"));

// Health Check
app.get("/", (req, res) => {
    res.json({ message: "Weather Dashboard API Running" });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { ssl: false }) // ensure no SSL
  .then(() => {
      console.log("✅ MongoDB Connected");
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
      console.error("❌ Database connection error:", err);
      process.exit(1);
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 87a7154cf6613bd991516ea02f53e04c3ab3b1a8
