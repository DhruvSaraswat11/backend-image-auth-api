const express = require("express");
const { fetchimages } = require("../controllers/image_controller");

const middlewareauth = require("../middleware/middlewareauth");
// const middleareadmin = require("../middleware/middleareadmin");
const router = express.Router();
router.get("/get", middlewareauth, fetchimages);

module.exports = router;
