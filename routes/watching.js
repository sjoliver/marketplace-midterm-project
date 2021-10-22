const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = [req.cookies['user_id']];
    let queryString = `
      SELECT l.*
      FROM listings AS l
        INNER JOIN favourites AS f ON f.listing_id = l.id
        INNER JOIN users AS u ON u.id = f.buyer_id
      WHERE buyer_id = $1
      ORDER BY l.id DESC
    ;`;
    db.query(queryString, userId)
      .then(data => {
        const listings = data.rows;
        res.render("pages/watching", {listings});
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
      SELECT l.*
      FROM listings AS l
        INNER JOIN favourites AS f ON f.listing_id = l.id
        INNER JOIN users AS u ON u.id = f.buyer_id
      WHERE buyer_id = $1
        AND asking_price >= $2
        AND asking_price <= $3
      ORDER BY listings.id DESC
    ;`;
    db.query(queryString, values)
      .then(data => {
        const listings = data.rows;
        console.log(listings);
        res.render("pages/watching", { listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
