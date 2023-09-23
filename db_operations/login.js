const express = require("express");
const sql = require("sqlite3").verbose();
const DBSOURCE = "./database/makers.db";
const md5 = require("md5");

const db = new sql.Database(DBSOURCE);

async function checkLogin(name, password) {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM users
        WHERE users.name = ?
        and users.password = ?`;

    db.all(query, [name, md5(password)], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows && rows.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Database connection closed");
    }
  });
}

module.exports = { checkLogin, closeDatabase };
