const express = require("express");
const router = express.Router();
const sql = require("sqlite3");
const login = require("../db_operations/login");

router.post("/login/submit", (req, res) => {
  console.log(req.body);
  async function authenticateUser() {
    try {
      const isAuthenticated = await login.checkLogin(req.body.name, req.body.password);
      if (isAuthenticated) {
        console.log("Authentification Successful");
      } else {
        console.log("Authentification failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  authenticateUser();
});

module.exports = router;
