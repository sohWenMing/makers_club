const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  console.log("getting something from home");
  res.render("home", { currentPage: "home" });
});
router.post("/", (req, res) => {
  console.log("getting something from home");
  res.send("post request received");
});

module.exports = router;
