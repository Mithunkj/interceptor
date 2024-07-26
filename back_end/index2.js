// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// const app = express();

// const PORT = process.env.PORT || 9000;

// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());

// //example user id
// const userId = "1234";

// const REFRESH_TOKEN = "refreshtoken";
// const SECKRET = "seckret";
// const REFRESH_TOKEN_EXPIRY = "1h"; // Example: 60 seconds
// const ACCESS_TOKEN_EXPIRY = "20s"; //Example: 60 seconds

// const COOKIE_EXPIRY = new Date(Date.now() + 1 * 30000); // Example: 1 hours

// // console.log(1 * 60 * 60 * 1000) // Example: 1 hours
// let corsOptions = {
//   origin: [
//     // "http://127.0.0.1:3000",
//     "http://localhost:3000",
//     // "http://localhost",
//   ],
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
// };

// app.use(cors(corsOptions));

// //login user
// app.get("/login", (req, res) => {
//   console.log("login enter");

//   //generat token
//   const token = accessToken(user);
//   //generat refreshtoken
//   const refreshToken = generateRefreshToken(userId);

//   //set cookie
//   res
//     .cookie("jwt", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       sameSite: process.env.NODE_ENV === "production" ? "none" : false,
//       expires: COOKIE_EXPIRY,
//     })
//     .json({ status: true, token: token, data: "user login successfull" });
// });

// //generate refreshtoken
// function generateRefreshToken(userId) {
//   let token = jwt.sign(
//     {
//       userId: userId,
//     },
//     REFRESH_TOKEN,
//     { expiresIn: REFRESH_TOKEN_EXPIRY }
//   );

//   return token;
// }

// //generate accessToken
// function accessToken(user) {
//   return jwt.sign(
//     {
//       userId: user._id,
//       isadmin: user.isadmin,
//       role: user.role,
//     },
//     process.env.SECKRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// }

// //getToken
// app.get("/token", async (req, res) => {
//   console.log("get token enter", req.cookies);
//   const cookies = req.cookies;
//   console.log(cookies);
//   // if (!cookies) {
//   //   console.log("line no 74")
//   // res.json({
//   //     status: false,
//   //     data: "user must be logged out.. please login again",
//   //   });
//   // }
//   console.log("line no 80");
//   let refreashToken = cookies.jwt;
//   console.log("line no 82", refreashToken);
//   if (!refreashToken) {
//     console.log("line no 84", refreashToken);
//     return res.json({
//       status: false,
//       data: "user must be logged out.. please login again",
//     });
//   }
//   console.log("line no 90", refreashToken);
//   //verify refreash token and produce access token
//   jwt.verify(refreashToken, REFRESH_TOKEN, (err, payload) => {
//     if (err) {
//       res.clearCookie("jwt", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production" ? true : false,
//         sameSite: process.env.NODE_ENV === "production" ? "none" : false,
//         expires: COOKIE_EXPIRY,
//       });
//       return res.json({
//         status: false,
//         data: "Unauthorized! refresh token exired",
//       });
//     }

//     const accessToken = jwt.sign(
//       {
//         userId: payload.userId,
//       },
//       REFRESH_TOKEN,
//       { expiresIn: ACCESS_TOKEN_EXPIRY }
//     );

//     res.json({ status: true, data: accessToken });
//   });
// });

// const verifyToken = async (req, res, next) => {
//   console.log("verifytoken enter", req.cookies);
//   const token = req.cookies.jwt;
//   jwt.verify(token, REFRESH_TOKEN, (err, payload) => {
//     if (err) {
//       console.log("verify error");
//       return res.json({ status: false, data: "token has expired" });
//     } else {
//       console.log(payload);
//       next();
//     }
//   });
// };

// app.use(verifyToken);

// app.get("/api", (req, res) => {
//   console.log("api get called");
//   res.send({ message: "Hello from the backend!" });
// });

// app.listen(PORT, () => {
//   console.log(`Backend server is running on port ${PORT}`);
// });
