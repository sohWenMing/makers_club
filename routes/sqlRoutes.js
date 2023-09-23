const express = require("express");
const router = express.Router();
const db = require("../db_operations/db_connection");

router.get("/admin", (req, res) => {
  res.send("getting something from admin");
});

router.get("/login", (req, res) => {
  res.render("./admin/admin");
});

module.exports = router;
