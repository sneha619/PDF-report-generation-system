const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the reports directory
app.use("/reports", express.static(path.join(__dirname, "reports")));

// === Mount your API routes first ===
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

// === Serve frontend AFTER API routes ===
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
