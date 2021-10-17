const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/messages", (req, res) => {
    res.render("pages/messages");
  });
return router;
};
