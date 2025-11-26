const express = require("express");
const router = express.Router();

const middlewareauth = require("../middleware/middlewareauth");
// when we go on api/home/welcome then this middlewareauth will run
router.get("/welcome", middlewareauth, (req, res) => {
  const { userid, username, role } = req.userinfo;
  res.json({
    messgage: "welcome to home page ",
    user: { 
      _id: userid,
      username: username,
      role: role,
    },
  });
});

module.exports = router;
