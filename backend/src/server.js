const express = require("express");
const cors = require("cors");              // ✅ ADD THIS
const connectDB = require("./config/db");

const app = express();

// CONNECT TO DATABASE
connectDB();

// MIDDLEWARE (ORDER MATTERS)
app.use(cors());                           // ✅ THIS FIXES "Server not reachable"
app.use(express.json());

// ROUTES ✅ (THIS WAS MISSING)
app.use("/api/auth", require("./routes/auth.routes"));

// TEST ROUTE (OPTIONAL BUT HELPFUL)
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
