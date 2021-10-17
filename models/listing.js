const sql = require("./db.js");

const Listing = function(user) {
  this.title = listing.title;
  this.seller_id = listing.seller_id;
  this.description = listing.description;
  this.num_of_bedrooms = listing.num_of_bedrooms;
  this.num_of_bathrooms = listing.num_of_bathrooms;
  this.sqr_inches = listing.sqr_inches;
  this.country = listing.country;
  this.province = listing.province;
  this.post_code = listing.post_code;
  this.street = listing.street;
  this.city = listing.city;
  this.asking_price = listing.asking_price;
  this.image_thumbnail = listing.image_thumbnail;
  this.image = listing.image;
  this.created_at = listing.created_at;
  this.available = listing.available;
};

Listing.getAll = result => {
  sql.query("SELECT * FROM listings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};

Listing.countAll = result => {
  sql.query("SELECT count(*) FROM listings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};


module.exports = Listing;
