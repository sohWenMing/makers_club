const express = require("express");
const router = express.Router();
const db = require("../db_operations/db_connection");
const dbAll = db.dbAll;
const requireAuth = require("../auth/auth");

router.get("/", requireAuth, (req, res) => {
  async function getThemes() {
    const sql = "select * from themes";
    const themes = await dbAll(sql);
    console.log(themes);
    return themes;
  }

  getThemes()
    .then((result) => {
      console.log(result.length);
      dataArray = result.map((res) => {
        const trimmedTheme = res.theme_information.trim();
        const cleanedTheme = trimmedTheme.replace(/\s+/g, " ");
        const imageString = res.image_data.toString("base64");
        const startDateTime = new Date(res.start_date_time);
        const endDateTime = new Date(res.end_date_time);
        return {
          id: res.id,
          themeName: res.theme_name,
          themeInformation: cleanedTheme,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          image: imageString,
        };
      });
      console.log(dataArray);
      dataArray.sort((a, b) => {
        return b.startDateTime - a.startDateTime;
      });
      console.log(dataArray);
      dataArray.forEach((result) => {
        if (result.startDateTime instanceof Date) {
          console.log("date");
        } else {
          console.log("not date");
        }
      });
      res.render("./admin/admin", { currentPage: "themes", dataArray: dataArray });
    })
    .catch((error) => {
      console.log(error);
      res.send("There was a problem connecting to the database, please try again");
    });
});

module.exports = router;
