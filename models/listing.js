const sql = require("./db.js");

const Listing = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

module.exports = Listing;
