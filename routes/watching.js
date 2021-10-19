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
    ;`;
    db.query(queryString, userId)
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
  return router;
};
