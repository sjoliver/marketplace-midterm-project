const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
      SELECT *
      FROM listings
      ;`;
    db.query(query)
      .then(data => {
        const listings = data.rows;
        res.render("pages/homepage", {listings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Search by price
  router.post("/byprice", (req, res) => {
    let max = 99999999;
    let min = 0;

    if (req.body.max) {
      max = req.body.max;
    }

    if (req.body.min) {
      min = req.body.min;
    }

    const values = [ min, max];

    let queryString = `
      SELECT *
      FROM listings
      WHERE asking_price >= $1
        AND asking_price <= $2
    ;`;
    db.query(queryString, values)
      .then(data => {
        const listings = data.rows;
        console.log(listings);
        res.render("pages/homepage", { listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:listing/watching", (req, res) => {
    const listingId = req.params.listing;
    const buyerId = req.cookies.user_id;
    const values = [buyerId, listingId];

    let queryString =
    `INSERT INTO favourites (buyer_id, listing_id)
    VALUES ($1, $2);
    `;

    db.query(queryString, values)
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
