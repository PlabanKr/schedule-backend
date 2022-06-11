exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated) {
    res.status(401).json({
      msg: "Login to access this route",
    });
  }
  next();
};
