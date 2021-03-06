const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  //Get the "My Listings" page
  router.get("/", (req, res) => {
    const userId = req.cookies['user_id'];
    let queryString = `
      SELECT *
      FROM listings
      WHERE seller_id = $1
      ORDER BY listings.id DESC
    ;`;
    db.query(queryString, [userId])
      .then(data => {
        const listings = data.rows;
        res.render("pages/my-listings", { listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Search by price
  router.post("/byprice", (req, res) => {
    const userId = req.cookies['user_id'];
    let max = 99999999;
    let min = 0;
    console.log(req.body);

    if (req.body.max) {
      max = req.body.max;
    }

    if (req.body.min) {
      min = req.body.min;
    }

    const values = [userId, min, max];

    console.log(values);

    let queryString = `
      SELECT *
      FROM listings
      WHERE seller_id = $1
        AND asking_price >= $2
        AND asking_price <= $3
      ORDER BY listings.id DESC
    ;`;
    db.query(queryString, values)
      .then(data => {
        const listings = data.rows;
        console.log(listings);
        res.render("pages/my-listings", { listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Get "Create Listing" page
  router.get("/new", (req, res) => {
    res.render("pages/new-listing");
  });

  //Add a new listing to the database
  router.post("/new", (req, res) => {
    sellerId = req.cookies["user_id"];
    newListing = req.body;
    console.log(typeof sellerId);

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
      ;`;

    let values = [ sellerId, title, description, bedrooms, bathrooms, insq, country, province, postcode, street, city, price, thumbnail ];


    console.log(values);
    db.query(queryString, values)
    .then((data) => {
      const listings = data.rows;
      console.log(listings);
      res.redirect("/");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //Delete selected listing
  router.post("/:listing/delete", (req, res) => {
    const listingId = req.params.listing;
    const sellerId = req.cookies.user_id;
    const values = [sellerId, listingId];

    let queryString =
    `DELETE FROM listings
    WHERE listings.seller_id = $1
    AND listings.id = $2;
    `;

    db.query(queryString, values)
      .then(() => {
        res.redirect("/my-listings");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Mark listing as sold
  router.post("/:listing/sold", (req, res) => {
    const listingId = req.params.listing;
    const sellerId = req.cookies.user_id;
    const values = [sellerId, listingId];

    let queryString =
    `UPDATE listings
    SET available = false
    WHERE listings.seller_id = $1
    AND listings.id = $2;
    `;

    db.query(queryString, values)
      .then(() => {
        res.redirect("/my-listings");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
