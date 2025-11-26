const middlewareadmin = (req, res, next) => {
  if (req.userinfo?.role != "admin") {
    return res.json({
      success: false,
      messgage: "Only admin can access this !",
    });
  }
  next();
};
module.exports = middlewareadmin;
