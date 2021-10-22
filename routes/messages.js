const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies['user_id']

    let query = `
      SELECT threads.id, subject, message, created_at, users.name as sender
      FROM threads
      JOIN messages on threads.id = thread_id
      JOIN thread_participants on thread_participants.thread_id = threads.id
      JOIN users ON users.id = sending_user_id
      WHERE thread_participants.user_id = $1
      GROUP BY threads.id, subject, message, created_at, users.name
      ORDER BY threads.id DESC, created_at DESC;
    `

    db.query(query, [userId])
      .then(response => {
        let templateVars = { messagesArray: response.rows };
        res.render("pages/messages", templateVars);
      })
      .catch((error) => console.log(error.message));
  });
  return router;
};
