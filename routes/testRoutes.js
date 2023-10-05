const express = require("express");
const router = express.Router(); // returns the Router object, which has methods

const requireAuth = require("../auth/auth");

router.get("/test", requireAuth, (req, res) => {
  res.send("getting something from test");
});

router.get("/destroy", (req, res) => {
  req.session.destroy;
  res.clearCookie("connect.sid");
  res.send("destroyed.");
});

module.exports = router;
