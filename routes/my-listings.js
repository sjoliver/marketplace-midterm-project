const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  //Get the items from the listings table
  router.get("/", (req, res) => {
      let query = `SELECT * FROM listings;`;
      console.log(query);
      db.query(query)
        .then(data => {
          const listings = data.rows;
          console.log(listings);
          res.render("pages/nick-test-home", { listings });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

  router.get("/new", (req, res) => {
    res.render("pages/new-listing");
  });
  //Add a new listing to the database
  router.post("/new", (req, res) => {
    sellerId = '1'
    newListing = req.body;
    console.log(newListing);

    const {
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      insq,
      street,
      city,
      postcode,
      country,
      province,
      thumbnail
    } = newListing;

    let queryString = `
      INSERT INTO listings ( seller_id, title, description, num_of_bedrooms, num_of_bathrooms, sqr_inches, country, province, post_code, street, city, asking_price, image_thumbnail )
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 )
      RETURNING *
      ;`;

    let values = [ sellerId, title, description, bedrooms, bathrooms, insq, country, province, postcode, street, city, price, thumbnail ];

    db.query(queryString, values)
    .then((data) => {
      const listings = data.rows;
      console.log(listings);
      res.render("pages/nick-test-home", { listings });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

return router;
};
