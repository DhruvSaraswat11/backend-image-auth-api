const jwt = require("jsonwebtoken");
require("dotenv").config();
const middlewareauth = (req, res, next) => {
  console.log("middleware auth is call");
  const headerauth = req.headers["authorization"]; // authorization ek headers ki property
  // console.log(headerauth);
  const token = headerauth && headerauth.split(" ")[1]; //&& → pehla falsy return karta hai, warna last truthy
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token is provided plz login to continue",
    });
  }
  //decode the token
  try {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(extracttoken);
    req.userinfo = extracttoken;
    //     req.userinfo = extracttoken kya karta hai
    // userinfo req ke andar store hogi newly crete
    // Yeh sirf Express ke request object par ek nayi property add karta hai.
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error occurs plz sign in",
    });
  }
};

module.exports = middlewareauth;
