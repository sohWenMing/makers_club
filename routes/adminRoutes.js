const express = require("express");
const router = express.Router();

const { db, dbAll } = require("../db_operations/db_connection");
const bodyParser = require("body-parser");
const requireAuth = require("../auth/auth");
const { getDateTimeFromString } = require("../helper_functions/timeFunctions");

const multer = require("multer");
const upload = multer({ dest: "../public/resources/uploaded" });

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

router.post("/themes", upload.single("fileUpload"), (req, res) => {
  if (req.file) {
    console.log("filename", req.file.filename);
  }
  // return res.status(400).send("Just some error");

  console.log(req.body);

  const startDate = getDateTimeFromString(req.body["Start Date"]);
  const endDate = getDateTimeFromString(req.body["End Date"]);
  if (req.body["Theme Name"].length > 50) {
    return res.status(400).send("Theme name cannot be over 50 characters");
  }
  if (req.body["Theme Information"].length > 250) {
    return res.status(400).send("Theme information cannot be more than 250 characters");
  }
  if (startDate === null) {
    return res.status(400).send("start date must be a valid date");
  }
  if (endDate === null) {
    return res.status(400).send("end date must be a valid date");
  }
  if (endDate < startDate) {
    return res.status(400).send("end date cannot be before start date");
  }
  res.send("getting something from themes");
});

module.exports = router;
