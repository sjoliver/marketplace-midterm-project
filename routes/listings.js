const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
      let query = `SELECT * FROM listings`;
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

  router.get("/new-listing/", (req, res) => {
    res.render("pages/new-listing");
  });


return router;
};
