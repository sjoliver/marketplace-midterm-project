const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM listings`;
    db.query(query)
      .then(data => {
        const listings = data.rows;
        res.render("pages/my-listings", {listings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:listing/delete", (req, res) => {
    const listingId = req.params.listing;
    const values = [listingId];

    let queryString =
    `DELETE FROM listings
    WHERE listings.id = $1`;
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

  router.post("/:listing/sold", (req, res) => {
    const listingId = req.params.listing;
    const values = [listingId];

    let queryString =
    `UPDATE listings
    SET available = false
    WHERE listings.id = $1`;
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
