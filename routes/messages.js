const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // refactor seller_id using $1
    let query = `
      SELECT subject, message, users.name as sender
      FROM messages
      JOIN users ON users.id = buyer_id
      WHERE seller_id = 1`

    db.query(query)
      .then(response => {
        let templateVars = { messagesArray: response.rows };
        res.render("pages/messages", templateVars);
      })
      .catch((error) => console.log(error.message));
  });
return router;
};
