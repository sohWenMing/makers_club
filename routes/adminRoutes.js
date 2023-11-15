const express = require("express");
const router = express.Router();
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require('path');

const { db, dbAll } = require("../db_operations/db_connection");
const bodyParser = require("body-parser");
const requireAuth = require("../auth/auth");
const { getDateTimeFromString, getISOString, prepareFlatpickrDateString } = require("../helper_functions/timeFunctions");
function storeImage(filePath) {
  const tempFilePath = filePath;
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
  })
  writeStream.on('error', (err) => {
    console.error('Error copying file: ', err);
    throw(err);
  });
};

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
    const themeId = parseInt(fields['themeId'][0]);
    const isNewRecord = themeId === 0;
    console.log(fields['previewSrc'][0]);
    const noPreviousImg = fields['previewSrc'][0] === './images/question_mark.jpeg';
    console.log("isNewRecord :", isNewRecord, "noPreviousImg :", noPreviousImg);
    let isImageUploaded = false;
    if(fields['image-input-filepond']) {
      isImageUploaded = true;
    };

    const prepStart = prepareFlatpickrDateString(fields['Start Date'][0]);
    
    const themeName = fields['Theme Name'][0];
    const startDate = getISOString(prepareFlatpickrDateString(fields['Start Date'][0]));
    const endDate = getISOString(prepareFlatpickrDateString(fields['End Date'][0]));
    const themeInformation = fields['Theme Information'][0];
    const previewImgPath = path.join(__dirname, "../public", fields['previewSrc'][0]);



  if(!isNewRecord) {
      if(isImageUploaded) {
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
            fs.unlink(previewImgPath, (err) => {
              if (err) {
                res.status(500).send('An error occured while removing the previous image');
              }
              else {
                console.log('Previous image deleted successfully');
              }
            })
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
      console.log("hitting this here");
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
        else {
          console.log("got to end of operation");
          res.status(200).send("database was updated");
        }
      });
    };
  }
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
