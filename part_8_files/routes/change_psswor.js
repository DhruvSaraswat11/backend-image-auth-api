const express = require("express");
const { changepassword } = require("../controllers/controller_auth");

const router = express.Router();
router.put("/login/changepassword", changepassword);

module.exports = router;
