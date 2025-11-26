  const express = require("express");
  const router = express.Router();
  const { registeruser, loginuser } = require("../controllers/controller_auth");

  //all routes are related to authentication & authorization
  router.post("/register", registeruser);
  router.post("/login", loginuser);

  module.exports = router;
