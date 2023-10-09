const express = require("express");
const router = express.Router();
const { db } = require("../db_operations/db_connection");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("./admin/login");
});

router.post("/submit", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(db);
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
        const userId = row.username;
        req.session.userId = userId;
        res.redirect("/");
      } else {
        res.send("Username and password do not match");
      }
    });
    console.log(row);
  });
});

module.exports = router;
