const express = require("express");
const router = express.Router();
const db = require("../db_operations/db_connection");
const util = require("util");

router.get("/", (req, res) => {
  console.log("getting something from home");
  res.render("home", { currentPage: "home" });
});
router.post("/", (req, res) => {
  console.log("getting something from home");
  res.send("post request received");
});

router.get("/testSQL", (req, res) => {
  const sql = "select * from themes";
  const dbAll = util.promisify(db.all.bind(db));
  async function getUser() {
    try {
      const rows = await dbAll(sql);
      readRows(rows);
      res.send("oh thank God it's working");
    } catch (err) {
      console.error(err.message);
    }
  }

  function readRows(rows) {
    console.log(rows);
  }
  getUser();
});
module.exports = router;
