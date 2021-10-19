const express = require('express');
const router  = express.Router();

const app = express();
app.use(express.static("public"));

module.exports = (db) => {

  router.post("/reply", (req, res) => {

    const newReply = db.query(`
      INSERT INTO messages (buyer_id, seller_id, subject, message, listing_id)
      VALUES ()`)

    res.json(newReply)
  })

  router.get("/reply", (req, res) => {
    // retrieve that message info from your db and send it back using -> res.json(the single message)


  })

  router.get("/:id", (req, res) => {
    const messageID = req.params.id;

    let query = `
      SELECT subject, message, messages.id, users.name as sender
      FROM messages
      JOIN users ON users.id = buyer_id
      WHERE seller_id = 1
        AND messages.id = $1
      `;

    db.query(query, [messageID])
      .then(response => {
        let templateVars = { message: response.rows[0] };
        res.render("pages/message-show", templateVars);
      })
      .catch((error) => console.log(error.message));
  });

return router;
};
