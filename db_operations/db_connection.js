const express = require("express");
const sql = require("sqlite3").verbose();

const DBSOURCE = "./database/makers.db";
const db = new sql.Database(DBSOURCE);

module.exports = db;
