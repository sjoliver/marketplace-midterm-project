const { request } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const threadId = req.params.id;
    const currentUser = req.cookies['user_id'];

    let query = `
      SELECT threads.id, subject, message, messages.created_at, users.name as sender, users.id as user_id, listings.title as listing_name
      FROM threads
      JOIN messages ON threads.id = thread_id
      JOIN thread_participants ON thread_participants.thread_id = threads.id
      JOIN users ON users.id = sending_user_id
      JOIN listings ON listings.id = listing_id
      WHERE thread_participants.user_id = $1
       AND threads.id = $2;
    `

    db.query(query, [currentUser, threadId])
      .then(response => {

        let templateVars = { message: response.rows[0], threadId };
        res.render("pages/message-show", templateVars);

      }).catch(error => console.log(error.message));
  });

return router;
};
