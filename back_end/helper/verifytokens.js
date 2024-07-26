const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const { SECKRET, REFRESH_TOKEN } = require("../utls/seckret");

//verify access token
const verifyToken = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let tokens = authHeader.split(" ")[1];
  if (!tokens) return res.status(401).json({ message: "header not found" }); //change

  // verify token
  jwt.verify(tokens, SECKRET, (err, payload) => {
    if (err) {
      return res.json({ status: false, data: "token has expired" });
    } else {
      req.userId = payload.userId;
      next();
    }
  });
};

//verify refresh token
const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshtoken = req.cookies.jwt;

    //find user using refreshtoken
    const dbtoken = await Token.findOne({ token: refreshtoken });

    if (dbtoken) {
      //to check refreshtoken is equle to dbtoken [refresh token error] 
      if (refreshtoken == dbtoken.token) {
        jwt.verify(refreshtoken, REFRESH_TOKEN, (err, user) => {
          if (err) {
            return res
              .status(401)
              .json({
                status: false,
                data: "Unauthorised access...",

              });
          } else {
            next();
          }
        });
      } else {
        //[redresh token mismatch]
        // logger.error("Unauthorised access 3");
        // const errr = new Error("Unauthorised access 4");
        // errr.code = "401";
        // throw errr;
        return res
          .status(401)
          .json({
            status: false,
            data: "Unauthorised access...",
          });
      }
    } else {
      //dbtoken null or undefined [user not found] 
      return res
        .status(401)
        .json({
          status: false,
          data: "Unauthorised access...",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: "internal server error" });
  }
};

module.exports = { verifyToken, verifyRefreshToken };
