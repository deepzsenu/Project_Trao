const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ---------------- Global Middlewares ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- API Versioning ---------------- */
app.use("/api/v1", require("./routes"));

/* ---------------- 404 Handler ---------------- */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ---------------- Error Middleware ---------------- */
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});