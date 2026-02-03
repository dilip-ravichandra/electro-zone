const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config();

const app = express();

// CONNECT TO DATABASE
connectDB();

// MIDDLEWARE (ORDER MATTERS)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend_1 is running");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: 'ElectroZone Backend_1 API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Backend_1 Server running on port ${PORT}`);
});
