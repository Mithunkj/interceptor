// const NODE_ENV ="production"
const NODE_ENV = "development"
const PORT = 9000

const REFRESH_TOKEN = "refreshtoken";
const SECKRET = "seckret";
const REFRESH_TOKEN_EXPIRY = "1h"; // Example: 60 seconds
const ACCESS_TOKEN_EXPIRY = "2m"; //Example: 120 seconds

const COOKIE_EXPIRY = new Date(Date.now() + 60 * 60 * 1000); // Example: 1 hours

module.exports = {
  NODE_ENV,
  PORT,
  REFRESH_TOKEN,
  SECKRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  COOKIE_EXPIRY,
};
