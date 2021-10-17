const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Listing = require('../models/listing');


router.get("/", (req, res) => {
  res.render("pages/listings");
});

router.get("/new-listing/", (req, res) => {
  res.render("pages/new-listing");
});


module.exports = router;
