const bcrypt = require("bcrypt");
const {db, dbAll, dbGet } = require("./db_connection.js");

const createTable = `
  CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  phone_number TEXT UNIQUE,
  email TEXT,
  password TEXT
  )`;

db.run(createTable, [], (err) => {
  if (!err) {
    console.log("table created");
  } else {
    console.log(err.message);
  }
});

const insertTable = `
INSERT INTO user (username, phone_number, email, password) VALUES (?, ?, ?, ?)
`;

const usersData = [
  { username: "Aisyah", phone_number: 88233354, email: "hello@themakersclub.com.sg", password: "BobTheBlob1" },
  { username: "Amelia", phone_number: 91992832, email: "hello@themakersclub.com.sg", password: "BobTheBlob2" },
  { username: "Nindgabeet", phone_number: 93847096, email: "wenming.soh@gmail.com", password: "BobTheBlob3" },
];

async function insertAndHashUsers(usersData) {
  for (const user of usersData) {
    const { username, phone_number, email, password } = user;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(insertTable, [username, phone_number, email, hashedPassword], function (err) {
        if (err) {
          console.log("Error inserting user:", err);
        } else {
          console.log(`User ${username} inserted with ID ${this.lastID}`);
        }
      });
    } catch (err) {
      console.log("Error hashing password", err.message);
    }
  }
}

insertAndHashUsers(usersData);
