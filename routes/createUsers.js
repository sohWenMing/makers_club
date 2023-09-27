const bcrypt = require("bcrypt");
const db = require("../db_operations/db_connection");

const createTable = `
  CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  phone_number TEXT UNIQUE,
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
INSERT INTO user (username, phone_number, password) VALUES (?, ?, ?)
`;

const usersData = [
  { username: "Aisyah", phone_number: 88233354, password: "BobTheBlob1" },
  { username: "Amelia", phone_number: 91992832, password: "BobTheBlob2" },
  { username: "Nindgabeet", phone_number: 93847096, password: "BobTheBlob3" },
];

async function insertAndHashUsers(usersData) {
  for (const user of usersData) {
    const { username, phone_number, password } = user;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(insertTable, [username, phone_number, hashedPassword], function (err) {
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
