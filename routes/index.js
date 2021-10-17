const express = require('express');
const router  = express.Router();
const listings_controller = require('../controllers/listingsController');
const users_controller = require('../controllers/usersController');

router.get("/", (req, res) => {
  res.render("pages/listings");
});

router.get("/listings-test", listings_controller.index);

router.get("/listings-test-2", listings_controller.findAll);

module.exports = router;
