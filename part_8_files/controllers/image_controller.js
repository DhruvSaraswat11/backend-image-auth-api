const imagemodel = require("../models/images");
const uploadTocloudinary = require("../helpers/coludinaryHelper");
const cloudinary = require("../config/cloudinary");
const uploadimage = async (req, res) => {
  try {
    //if file is missing in req
    if (!req.file) {
      return res.json({
        success: false,
        messgage: "file is require plz -- it ",
      });
    }
    //upload to cloudinry
    console.log("file", req.file);
    const { url, publicid } = await uploadTocloudinary(req.file.path);
    //store url and publicid in with uploaded user id in database
    const newlycreteimge = await imagemodel.create({
      url: url,
      publicid: publicid,
      uploadedby: req.userinfo?.userid,
    });

    res.json({
      success: true,
      message: "image uploaded succesfully !",
      image: newlycreteimge,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "something went wrong ! plz try again ",
    });
  }
};
// fetc from cloudinary
const fetchimages = async (req, res) => {
  try {
    // pegintion
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortorder = req.query.sortorder === "asc" ? 1 : -1;

    const totalimages = await imagemodel.countDocuments();
    const totalpages = Math.ceil(totalimages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortorder;
    //     key → createdAt (jis field ke basis par sort karna hai)
    // value → -1 (descending order)
    const images = await imagemodel
      .find({})
      .sort(sortObj)
      .skip(skip)
      .limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        currentpage: page,
        totalpages: totalpages,
        totalimages: totalimages,
        t: images,
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "something went wrong ! plz try again ",
    });
  }
};

const deleteimg = async (req, res) => {
  try {
    const getcurrentimgidTobedelete = req.params.id;
    const userid = req.userinfo.userid;
    const image = await imagemodel.findById(getcurrentimgidTobedelete);
    if (!image) {
      return res.status(401).json({
        success: false,
        message: "Image not found on this url",
      });
    }

    //check if this image is uplaoded by the current user who is trying to delete it
    if (image.uploadedby.toString() != userid) {
      return res.status(409).json({
        success: false,
        message: "you are not the valid person to delete it",
      });
    }

    //delete this image first from cloudinary storage
    const r = await cloudinary.uploader.destroy(image.publicid);
    console.log(r);
    // delete the image from mongodb
    await imagemodel.findByIdAndDelete(getcurrentimgidTobedelete);

    res.status(200).json({
      success: true,
      message: "image deleted succesfully ! ",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured please try later !",
    });
  }
};

module.exports = { uploadimage, fetchimages, deleteimg };
