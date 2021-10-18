const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM users;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const users = data.rows;
        res.render( "pages/index", { users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
