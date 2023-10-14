const express = require("express");
const router = express.Router();
const db = require("../db_operations/db_connection");
const dbAll = db.dbAll;
const requireAuth = require("../auth/auth");

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const sql = "select * from themes";
    const themes = await dbAll(sql);
    console.log(themes);
    console.log(themes.length);

    dataArray = themes.map((theme) => {
      const trimmedTheme = theme.theme_information.trim();
      const cleanedTheme = trimmedTheme.replace(/\s+/g, " ");
      const imageString = theme.image_data.toString("base64");
      const startDateTime = new Date(theme.start_date_time);
      const endDateTime = new Date(theme.end_date_time);
      return {
        id: theme.id,
        themeName: theme.theme_name,
        themeInformation: cleanedTheme,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        image: imageString,
      };
    });
    dataArray.sort((a, b) => {
      return b.startDateTime - a.startDateTime;
    });
    res.render("./admin/admin", { currentPage: "themes", dataArray: dataArray });
  } catch (error) {
    error.message = error.message + "\n Error is coming from admin page";
    next(error);
  }
});

module.exports = router;
