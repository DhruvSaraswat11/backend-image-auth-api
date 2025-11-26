const cloudinary = require("../config/cloudinary");
const uploadTocloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    // result ke andr cloudinry respose dege check it on https://cloudinary.com/documentation/upload_images#landingpage
    return {
      url: result.secure_url,
      publicid: result.public_id,
    };
  } catch (e) {
    console.log("Error while uploading image", e);
    throw new Error("Error while uploading image");
  }
};

module.exports = uploadTocloudinary;
