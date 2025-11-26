const express = require("express");
const { deleteimg } = require("../controllers/image_controller");

const middlewareauth = require("../middleware/middlewareauth");
const middlewareadmin = require("../middleware/middleareadmin");
const router = express.Router();
router.delete("/delete/:id", middlewareauth, middlewareadmin, deleteimg);

module.exports = router;

//http://localhost:9000/api/image/delete/6925bf467272c8cbec47cbf3
