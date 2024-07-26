const express = require("express");

const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectdb = require("./connect/connect");
const User = require("./models/userModel");
const Token = require("./models/tokenModel");
const { accessToken, generateRefreshToken } = require("./helper/generettoken");
const { verifyToken, verifyRefreshToken } = require("./helper/verifytokens");
const {
  SECKRET,
  COOKIE_EXPIRY,
  NODE_ENV,
  REFRESH_TOKEN,
  ACCESS_TOKEN_EXPIRY,
} = require("./utls/seckret");

let corsOptions = {
  origin: [
    // "http://127.0.0.1:3000",
    "http://localhost:3000",
    // "http://localhost",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

connectdb();

// signup POST API
app.post("/signup", async (req, res) => {
  const user = { name: req.body.name, password: req.body.password };

  //create user
  const createUser = await User.create(user);
  res.json({ status: true, data: "user signup successfull" });
});

//login POST API
app.post("/login", async (req, res) => {
  const userdata = { name: req.body.name, password: req.body.password };

  const user = await User.findOne({ name: userdata.name });

  if (!user) {
    return res.json({ data: "user not found" });
  }
  //generat token
  const token = accessToken(user);
  //generat refreshtoken
  const refreshToken = generateRefreshToken(user);

  //create token store userId and refreshToken
  const createToken = await Token.create({
    userId: user._id,
    token: refreshToken,
  });

  // set cookie refreshtoken
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production" ? true : false,
    sameSite: NODE_ENV === "production" ? "none" : false,
    expires: COOKIE_EXPIRY,
  });

  res.json({ status: true, token: token, data: "user login successfull" });
});

//getToken GET API
app.get("/token", async (req, res) => {
  const cookies = req.cookies;

  // cookies is undefind or null
  if (!cookies) {
    return res.json({
      status: false,
      data: "user must be logged out.. please login again",
    });
  }

  let refreashToken = cookies.jwt;

  //find user using refreashToken
  const foundUser = await Token.findOne({ token: refreashToken });

  //user not found
  if (!foundUser) {
    return res.json({
      status: false,
      data: "user must be logged out.. please login again",
    });
  }

  if (!refreashToken) {
    return res.json({
      status: false,
      data: "user must be logged out.. please login again",
    });
  }

  //verify refreash token and produce access token
  jwt.verify(refreashToken, REFRESH_TOKEN, (err, payload) => {
    if (err) {
      //clear cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: NODE_ENV === "production" ? true : false,
        sameSite: NODE_ENV === "production" ? "none" : false,
        expires: COOKIE_EXPIRY,
      });
      return res.json({
        status: false,
        data: "Unauthorized! refresh token exired",
      });
    }

    //generate access token
    const accessToken = jwt.sign(
      {
        userId: payload.userId,
      },
      SECKRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    res.json({ status: true, data: accessToken });
  });
});

//verify Refresh Token
app.use(verifyRefreshToken);

//verify token
app.use(verifyToken);

//get message GRT API
app.get("/api", (req, res) => {
  console.log("api get called");
  res.send({ data: "Hello from the backend!" });
});

app.listen(9000, () => {
  console.log("app start listnening on port " + 9000);
});
