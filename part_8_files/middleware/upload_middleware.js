const multer = require("multer");
const path = require("path");

// **req.file ko multer create karta hai.
// multer run hone se pehle koi middleware req.file ko access nahi kar sakta.**
// Isliye pehle 2 middlewares ko file nahi milti.

//set our multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter function
const checkfilefilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image ! plz upload only images"));
  }
};
// multer middleware

module.exports = multer({
  storage: storage,
  fileFilter: checkfilefilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 mb
  },
});
// 1 Client se aayi binary file ko read karta hai
// Client file ko binary data (01010101...) ke form me bhejta hai.
// multer is binary stream ko samajhta hai.
// 2️⃣ Binary ko actual file me convert karta hai
// Multer:NodeJs ka fs.createWriteStream() use karta hai
// Binary chunks ko ek folder me file ki form me write karta hai
// Isse server par real file create ho jati hai.
// 3️⃣ File ki information generate karta hai (metadata)
// {
//   fieldname: 'image',
//   originalname: 'photo.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: '17325688-photo.jpg',
//   path: 'uploads/17325688-photo.jpg',
//   size: 23900
// }

// 4️⃣ Us info ko req.file me inject karta hai
// Taaki backend wale control me tum file ka data use kar sako:
// req.file.path
// req.file.filename
// req.file.mimetype
// 5️⃣ Phir next middleware ko call karta hai
// Taaki tum Cloudinary me upload kar sako ya database me save kar sako.

// Step 1 → fileFilter

// Image? OK

// Not image? Reject

// Step 2 → limits

// Size under limit? OK

// Too large? Reject

// Step 3 → storage

// File ko folder me save karo

// Filename set karo

// Step 4 → Multer internally → next() call karta hai

// Aur fir next wala route handler run hota hai.

// 1 storage: storage

// → Upload hone wali file kaha save hogi
// → File ka naam kya hoga
// → Ye part storage wala function handle karta hai

// ✔ B) fileFilter: checkfilefilter

// → Ye function har file ko check karega:

// image hai? accept

// image nahi hai? reject

// Multer ye filter sabse pehle run karta hai.
// ✔ C) limits: { fileSize }
// → Ye size limit check karta hai
// → Agar file 5MB se badi hai → ERROR dega
// → Route controller tak file nahi jaati
