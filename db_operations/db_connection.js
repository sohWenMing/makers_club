const express = require("express");
const sql = require("sqlite3").verbose();
const util = require("util");
const path = require("path");

const DBSOURCE = path.join(__dirname, "../database/makers.db");
const db = new sql.Database(DBSOURCE);
const dbAll = util.promisify(db.all.bind(db));
const dbGet = util.promisify(db.get.bind(db));

module.exports = { db, dbAll, dbGet };

//  to be refactored later. DBSOURCE here is
//  ./database/makers.db because of where db_connection is called from. as this is called from loginRoutes.js,
// which is itself exported to app.js
