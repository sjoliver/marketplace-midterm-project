const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("pages/listings");
  });

  router.get("/new-listing/", (req, res) => {
    res.render("pages/new-listing");
  });
return router;
};
