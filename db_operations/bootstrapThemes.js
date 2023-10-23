const{db} = require("./db_connection.js");
const prepBlobData = require("../helper_functions/prepBlobData.js");
const { getISOString } = require("../helper_functions/timeFunctions.js");
const createImageTable = `
CREATE TABLE themes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    theme_name TEXT UNIQUE,
    theme_information TEXT,
    start_date_time TEXT,
    end_date_time TEXT,
    image_data BLOB
)
`;
db.run(createImageTable, [], (err) => {
  if (!err) {
    console.log("themes table created!");
  } else {
    console.log(err.message);
  }
});

class Theme {
  constructor(themeName, themeInformation, startDateTime, endDateTime, imageData) {
    this.themeName = themeName;
    this.themeInformation = themeInformation;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.imageData = imageData;
  }
}

const themesData = [];

const kampongKatong = new Theme(
  "Kampong Katong",
  `
    We're incredibly blessed to have an amazing village - we're surrounded
    by the most supportive, loving community! Kampung Katong is meant to be 
    a culmination of our minimakers' perspective of who and what makes up
    their community.
    `,
  getISOString("2023-04-01T00:00:00.000"),
  getISOString("2023-06-30T00:00:00.000"),
  prepBlobData("../resources/kampong_katong.webp")
);

const gamesWePlay = new Theme(
  "Games We Play",
  `
     Welcome, young adventurers, to a playful land. Where imagination and fun
     go hand in hand. Here stands a magical installation, all bundled in one.
     With Snakes & Ladders, Twister, Tabletop Games, Mazes ... the fun's
     begun!
     `,
  getISOString("2023-07-01T00:00:00.000"),
  getISOString("2023-09-30T00:00:00.000"),
  prepBlobData("../resources/games_we_play.webp")
);

themesData.push(kampongKatong);
themesData.push(gamesWePlay);

const insertThemes = `
    INSERT INTO themes(
        theme_name, 
        theme_information, 
        start_date_time, 
        end_date_time,
        image_data) VALUES(?, ?, ?, ?, ?)
    `;

db.serialize(() => {
  themesData.forEach((theme) => {
    db.run(insertThemes, [theme.themeName, theme.themeInformation, theme.startDateTime, theme.endDateTime, theme.imageData], function (err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Theme inserted with ID ${this.lastID}`);
      }
    });
  });
});
