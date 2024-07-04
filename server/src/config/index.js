require("dotenv").config();
const optionalConfig = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

const requiredConfig = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};

for (const key in requiredConfig) {
  // Check if the key is null or undefined
  // == is used to check for null and undefined
  if (requiredConfig[key] == null) {
    throw new Error(`Missing value for environment variable ${key}`);
  }
}

module.exports = { ...optionalConfig, ...requiredConfig };
