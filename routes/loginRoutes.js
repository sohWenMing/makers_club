const express = require("express");
const router = express.Router();
const { db, dbAll, dbGet } = require("../db_operations/db_connection");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  console.log(dbAll);
  res.render("./admin/login");
});

router.post("/submit", async (req, res, next) => {
  try {
    const selectUser = `
    SELECT * from user
    WHERE user.username = ?`;
    const loginResult = await dbGet(selectUser, [req.body.username]);
    console.log(loginResult);
    if (!loginResult) {
      const loginError = new Error("User is not found");
      throw loginError;
    }
    async function comparePasswords(plainTextPassword, hashedPassword, next) {
      try {
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        console.log(match);
        if (!match) {
          const loginError = new Error();
          loginError.name = "Login Error";
          loginError.message = loginError.message + "Not Authenticated";
          throw loginError;
        }
        const userId = loginResult.username;
        req.session.userId = userId;
        res.redirect("/admin");
      } catch (error) {
        throw error;
      }
    }
    await comparePasswords(req.body.password, loginResult.password);
  } catch (error) {
    error.message = error.message + " coming from login submit";
    next(error);
  }

  // if (err) {
  //   res.send("there was an error processing your request");
  //   return;
  // }
  // if (!row) {
  //   res.send("Username is not found");
  //   return;
  // }
  // bcrypt.compare(req.body.password, row.password, function (err, result) {
  //   if (result) {
  //     const userId = row.username;
  //     req.session.userId = userId;
  //     res.redirect("/");
  //   } else {
  //     res.send("Username and password do not match");
  //   }
  // });
  // console.log(row);
  // });
});

module.exports = router;
