const { request, response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {

    const sendingUserId = req.cookies['user_id'];
    const message = req.body.text;
    const threadId = req.body.threadId.split("?")[0];

    const messagesQuery = `
    INSERT INTO messages (sending_user_id, message, thread_id, created_at)
    VALUES ($1, $2, $3, current_timestamp) RETURNING *;
    `

    db.query(messagesQuery, [sendingUserId, message, threadId])
      .then((response) => {

        const participantsQuery = `
            INSERT INTO thread_participants (thread_id, user_id)
            VALUES ($1, $2)
            `
        db.query(participantsQuery, [threadId, sendingUserId])

        res.json(response.rows[0])

      }).catch(error => console.log(error.message));

  });

  router.get("/:id", (req, res) => {
    const threadId = req.params.id;
    const currentUser = req.cookies['user_id'];

    let query = `
      SELECT message, subject, listings.title as listingName, threads.id as thread_id, users.name as sender, users.id as user_id
      FROM messages
      JOIN users ON users.id = sending_user_id
      JOIN threads on threads.id = thread_id
      JOIN listings on listings.id = listing_id
      JOIN thread_participants on thread_participants.thread_id = threads.id
      WHERE thread_participants.user_id = $1
        AND threads.id = $2;
      `;

    db.query(query, [currentUser, threadId])
      .then(response => {

        res.json(response.rows);

      }).catch(error => console.log(error.message));
  })

return router;
};
