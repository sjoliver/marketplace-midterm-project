const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const db = new Pool(dbParams);
db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = db;
