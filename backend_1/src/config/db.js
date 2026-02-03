const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/electrozone_1";
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected successfully to " + uri);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // Don't exit in development, allow the app to run
        console.warn("Continuing without MongoDB. Features requiring database will fail.");
    }
};

module.exports = connectDB;
