const usermodel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//register controller
const registeruser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    //check if the user is already exist in database
    const checkexistinguser = await usermodel.findOne({
      $or: [{ username }, { email }],
    });
    if (checkexistinguser) {
      return res.status(400).json({
        success: false,
        message: "user is already exist either with same username or email !",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user and save in your database
    const newlycreateduser = await usermodel.create({
      username, //object shorthand username : username
      email,
      password: hashedPassword,
      role: role || "user",
    });

    if (newlycreateduser) {
      res.status(201).json({
        success: true,
        message: "user registered successful",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "user registered faliss !",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured please try later !",
    });
  }
};
//login controller
const loginuser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find current user exit in db
    const user = await usermodel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exists",
      });
    }

    //check psswor
    const ispss = await bcrypt.compare(password, user.password);
    if (!ispss) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    // create user token
    // jwt.sign(
    //   { email: req.body.email }, // payload -> token ka data section, jisme hum woh info rakhte hain jo server ko user identify karne me help kare.
    //   "mysecret",                // secret key
    //   { expiresIn: "1h" }        // options
    // );

    const token = jwt.sign(
      {
        userid: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
      success: true,
      message: "log in successful",
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured please try later !",
    });
  }
};

// change password
const changepassword = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: "false",
        msg: "Invalid user plz register or enter correct email details",
      });
    }
    // encode the password

    const newpassword = req.body.password;
    if (!newpassword) {
      return res.status(500).json({
        success: false,
        message: "please enter your new password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    const updatepassuser = await usermodel.findByIdAndUpdate(
      user._id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    res.json({
      success: true,
      update: updatepassuser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured please try later !",
    });
  }
};

module.exports = { registeruser, loginuser, changepassword };
