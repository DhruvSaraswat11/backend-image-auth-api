const express = require("express");
const router = express.Router();

const middlewareauth = require("../middleware/middlewareauth");
const middlewareadmin = require("../middleware/middleareadmin");

router.get("/welcome", middlewareauth, middlewareadmin, (req, res) => {
  res.json({
    message: "welcome to admin section",
    user: req.userinfo,
  });
});

module.exports = router;
