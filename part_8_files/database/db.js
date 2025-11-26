const mongoose = require("mongoose");
async function connectTodb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db is connected successfull");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
module.exports = connectTodb;
