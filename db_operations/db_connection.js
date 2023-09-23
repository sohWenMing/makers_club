const express = require("express");
const router = express.Router();
const sql = require("sqlite3").verbose();
const md5 = require("md5");

const principalData = [
  ["Amelia C", md5("bobTheBlob1"), "91992832"],
  ["Aisyah Z", md5("bobTheBlob2"), "82233354"],
  ["nindgabeet", md5("bobTheBlob3"), "93847096"],
];

const DBSOURCE = "./database/makers.db";
const db = new sql.Database(DBSOURCE);

async function createUsersTable() {
  return new Promise((resolve, reject) => {
    const createTable = ` CREATE TABLE IF NOT EXISTS
      users (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name text,
      phone_number text UNIQUE,
      password text
    )`;
    db.run(createTable, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log("Table already created or already exists");
        resolve();
      }
    });
  });
}

async function insertUsers(data) {
  return new Promise((resolve, reject) => {
    const createPrincipal = `
    INSERT OR IGNORE INTO users (name, phone_number, password) VALUES (?,?,?)`;

    db.run(createPrincipal, data, (err) => {
      if (err) {
        try {
          if (err.message.includes("UNIQUE constraint failed: users.phone_number")) {
            console.log(`Phone number ${data[2]} already exists. Skipping.`);
          } else {
            throw err;
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        console.log(`Data for ${data[0]} was successfully added.`);
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await createUsersTable();
    for (const data of principalData) {
      await insertUsers(data);
    }
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("data connection closed");
      }
    });
  } catch (err) {
    console.log("some error occured");
    console.error(err.message);
  }
}

module.exports = main;
