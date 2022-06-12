exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      msg: "Unauthorized activity! Please login to access the content",
    });
  } else {
    next();
  }
};
