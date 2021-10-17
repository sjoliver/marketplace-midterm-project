const express = require('express');
const router  = express.Router();
const listings_controller = require('../controllers/listingsController');



router.get("/", listings_controller.index);

module.exports = router;
