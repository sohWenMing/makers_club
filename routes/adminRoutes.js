const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

const { db, dbAll } = require("../db_operations/db_connection");
const bodyParser = require("body-parser");
const requireAuth = require("../auth/auth");
const { getDateTimeFromString, getISOString, prepareFlatpickrDateString } = require("../helper_functions/timeFunctions");

// const multer = require("multer");
// const upload = multer({ dest: "../public/resources/uploaded" });

const formidable = require("formidable");

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

router.post("/uploads", (req, res) => {
  console.log("BEGIN / upload");
  const form = new formidable.IncomingForm({
    multiples: false,
    allowEmptyFiles: true,
    minFileSize: 0,
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    let theFile = files["image-input-filepond"][0].filepath;
    console.log("theFile: " + theFile);
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send(theFile);
  });
});

router.post("/themes", (req, res) => {
  console.log("BEGIN /save");
  // const form = new formidable.IncomingForm({
  //   allowEmptyFiles: true,
  //   minFileSize: 0,
  //   keepExtensions: true,
  // });
  const form = new formidable.IncomingForm({
    multiples: false,
    allowEmptyFiles: true,
    minFileSize: 0,
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("fields:", fields);

    const prepStart = prepareFlatpickrDateString(fields['Start Date'][0]);
    console.log("prep start:" , prepStart)

    const themeName = fields['Theme Name'][0];
    const startDate = getISOString(prepareFlatpickrDateString(fields['Start Date'][0]));
    const endDate = getISOString(prepareFlatpickrDateString(fields['End Date'][0]));
    // console.log("Prepared start date: ", startDate);
    // console.log("Prepared end date: ", endDate);
    const themeInformation = fields['Theme Information'][0];
    const themeId = parseInt(fields['themeId'][0]);
    let isImageUploaded = false;

    if(fields['image-input-filepond']) {
      isImageUploaded = true;
      console.log(fields['image-input-filepond'][0]);
      const tempFilePath = fields['image-input-filepond'][0];
      const fileName = path.basename(tempFilePath);
      const destinationFolder = path.join(__dirname, '../public/resources/uploaded');
      const destinationFilePath = path.join(destinationFolder, fileName);
      const imageUrl = "./resources/uploaded/" + fileName;
      console.log("image_url_created: ", imageUrl);
      const readStream = fs.createReadStream(tempFilePath);
      const writeStream = fs.createWriteStream(destinationFilePath);
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log('File copy completed');
        const sql = `
        UPDATE themes
        SET
          theme_name = ?,
          theme_information = ?,
          start_date_time = ?, 
          end_date_time = ?,
          image_url = ?
        WHERE
          id = ?
        `
        db.run(sql, [themeName, themeInformation, startDate, endDate, imageUrl, themeId], function (err) {
          if (err) {
            console.error(err.message);
          }
          res.status(200).send("database was updated");
        })
      });
      
      writeStream.on('error', (err) => {
        console.error('Error copying file: ', err);
        res.status(500).send('An error occured while copying the file');
      });
    }
    else {
      console.log("no files were uploaded");
      const sql = `
      UPDATE themes
      SET
        theme_name = ?,
        theme_information = ?,
        start_date_time = ?, 
        end_date_time = ?
      WHERE
        id = ?
      `
      db.run(sql, [themeName, themeInformation, startDate, endDate, themeId], function (err) {
        if (err) {
          res.status(500).send('An error occured');
        }
        res.status(200).send("database was updated");
      })
    };
  // res.send("ok getting something")
  });
});

//   const startDate = getDateTimeFromString(req.body["Start Date"]);
//   const endDate = getDateTimeFromString(req.body["End Date"]);
//   if (req.body["Theme Name"].length > 50) {
//     return res.status(400).send("Theme name cannot be over 50 characters");
//   }
//   if (req.body["Theme Information"].length > 250) {
//     return res.status(400).send("Theme information cannot be more than 250 characters");
//   }
//   if (startDate === null) {
//     return res.status(400).send("start date must be a valid date");
//   }
//   if (endDate === null) {
//     return res.status(400).send("end date must be a valid date");
//   }
//   if (endDate < startDate) {
//     return res.status(400).send("end date cannot be before start date");
//   }
//   console.log("all validations passed");
//   res.send("getting something from themes");
// });

module.exports = router;
