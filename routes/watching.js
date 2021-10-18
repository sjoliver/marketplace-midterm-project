const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/messages", (req, res) => {
      let query = `
        SELECT *
        FROM listings AS l
          INNER JOIN favourites AS f ON f.listing_id = l.id
          INNER JOIN users AS u ON u.id = f.buyer_id
        WHERE u.name = 'Britix Zurkind'
        LIMIT 1
      ;`;
      console.log(query);
      db.query(query)
        .then(data => {
          const listings = data.rows;
          console.log(listings);
          res.json(listings);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

return router;
};
