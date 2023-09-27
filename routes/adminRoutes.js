const express = require("express");
const router = express.Router();
const sql = require("sqlite3");
const login = require("../db_operations/login");
const db = require("../db_operations/db_connection");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("./admin/login");
});

router.post("/login/submit", (req, res) => {
  console.log(req.body.username);
  const selectUser = `
    SELECT * from user
    WHERE user.username = ?`;
  db.get(selectUser, [req.body.username], function (err, row) {
    if (err) {
      res.send("there was an error processing your request");
      return;
    }
    if (!row) {
      res.send("Username is not found");
      return;
    }
    bcrypt.compare(req.body.password, row.password, function (err, result) {
      if (result) {
        res.redirect("/");
      } else {
        res.send("Username and password do not match");
      }
    });
    console.log(row);
  });
});

module.exports = router;
