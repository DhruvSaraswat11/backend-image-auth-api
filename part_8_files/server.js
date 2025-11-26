require("dotenv").config();
const express = require("express");
const connectTodb = require("./database/db");
connectTodb();
const authroutes = require("./routes/routes_auth");
const homeroute = require("./routes/homeroute");
const adminroute = require("./routes/admin");
const uploadimageroute = require("./routes/routeimages");
const showimages = require("./routes/show_images");
const changepassword = require("./routes/change_psswor");
const deleteimg = require("./routes/delete_image");
const port = process.env.PORT;
const app = express();

app.use(express.json()); //globally middleware
app.use("/api/auth", authroutes);
app.use("/api/home", homeroute);
app.use("/api/admin", adminroute);
app.use("/api/image", uploadimageroute);
app.use("/api/images", showimages);
app.use("/api/auth", changepassword);
app.use("/api/image", deleteimg);
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
