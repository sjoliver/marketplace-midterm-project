const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
      let query = `SELECT * FROM listings LIMIT 1 `;
      console.log(query);
      db.query(query)
        .then(data => {
          const listings = data.rows;
          console.log(listings);
          res.render("pages/my-listings", listings);
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

  router.post("/new", (req, res) => {
    res.render("pages/my-listings");
  });


return router;
};
