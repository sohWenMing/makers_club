const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { db, dbAll } = require("../db_operations/db_connection");
const bodyParser = require("body-parser");
const requireAuth = require("../auth/auth");
// remember to implement requireAuth back
router.get("/", async (req, res, next) => {
  try {
    const sql = "select * from themes";
    const themes = await dbAll(sql);

    dataArray = themes.map((theme) => {
      const trimmedTheme = theme.theme_information.trim();
      const cleanedTheme = trimmedTheme.replace(/\s+/g, " ");
      const image_url = theme.image_url;
      const startDateTime = new Date(theme.start_date_time);
      const endDateTime = new Date(theme.end_date_time);
      return {
        id: theme.id,
        themeName: theme.theme_name,
        themeInformation: cleanedTheme,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        image_url: image_url,
        page: "themes",
        existing: "true",
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

router.post("/themes", (req, res) => {
  console.log("definitely getting pinged here");
  res.send("getting something from themes");
  console.log(req.body);
});

module.exports = router;
