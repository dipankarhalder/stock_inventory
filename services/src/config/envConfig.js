const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGOURI: process.env.MONGOURI,
  PLATFORM: process.env.PLATFORM,
  JWT_ACCESS: process.env.JWT_ACCESS,
  JWT_REFRESH: process.env.JWT_REFRESH,
  ACCESS_EXPIRY: process.env.ACCESS_EXPIRY,
  REFRESH_EXPIRY: process.env.REFRESH_EXPIRY,
  NODE_ENV: process.env.NODE_ENV,
};
