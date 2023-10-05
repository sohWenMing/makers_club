const session = require("express-session");

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = requireAuth;
