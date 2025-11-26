const express = require("express");
const router = express.Router();

const middlewareauth = require("../middleware/middlewareauth");
const middlewareadmin = require("../middleware/middleareadmin");
const uploadmiddleware = require("../middleware/upload_middleware");
const { uploadimage } = require("../controllers/image_controller");

//upload the image

router.post(
  "/upload",
  middlewareauth,
  middlewareadmin,
  uploadmiddleware.single("image"),
  uploadimage
);

module.exports = router;
