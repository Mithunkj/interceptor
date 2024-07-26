const jwt = require("jsonwebtoken");
const {
  SECKRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
} = require("../utls/seckret");

//generate refreshtoken
function generateRefreshToken(user) {
  let token = jwt.sign(
    {
      userId: user._id,
    },
    REFRESH_TOKEN,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return token;
}

//generate accessToken
function accessToken(user) {
  return jwt.sign(
    {
      userId: user._id,
    },
    SECKRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

module.exports = { generateRefreshToken, accessToken };
