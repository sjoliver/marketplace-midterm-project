const express = require('express');
const router  = express.Router();
const users_controller = require('../controllers/usersController');


router.get("/", users_controller.findAll);

router.get("/:userId", users_controller.findOne);

router.post("/", users_controller.create);

module.exports = router;
