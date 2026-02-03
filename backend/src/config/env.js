// Environment variables loader
require('dotenv').config();

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'PORT',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

module.exports = {
  mongodb: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
};
