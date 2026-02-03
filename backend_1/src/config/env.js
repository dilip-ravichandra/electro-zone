// Environment variables loader
require('dotenv').config();

const requiredEnvVars = [
  'JWT_SECRET',
  'PORT',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Missing environment variable: ${envVar}`);
  }
});

module.exports = {
  mongodb: process.env.MONGODB_URI || "mongodb://localhost:27017/electrozone_1",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key_here",
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
};
