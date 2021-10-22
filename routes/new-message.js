const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:listing", (req, res) => {
    const listing = Number(req.params.listing);
    res.render('pages/new-message', { listing })
  })

  router.post("/:listing", (req, res) => {

    const sendingUserId = Number(req.cookies['user_id']);
    const subject = req.body.subject;
    const body = req.body.body;
    const listing = req.params.listing;

    // insert into THREADS first
    const threadsQuery = `
    INSERT INTO threads (subject, listing_id)
    VALUES ($1, $2) RETURNING id;
    `

    db.query(threadsQuery, [subject, listing])
      .then((response) => {

        const threadId = response.rows[0].id

        // insert into MESSAGES second
        const messagesQuery = `
        INSERT INTO messages (sending_user_id, message, thread_id, created_at)
        VALUES ($1, $2, $3, current_timestamp)
        `

        db.query(messagesQuery, [sendingUserId, body, threadId])
          .then((response) => {

            // insert into THREAD_PARTICIPANTS third
            const participantsQuery = `
            INSERT INTO thread_participants (thread_id, user_id)
            VALUES ($1, $2), ($1, (SELECT seller_id FROM listings WHERE listings.id = $3));
            `
            db.query(participantsQuery, [threadId, sendingUserId, listing])

          }).catch(error => console.log(error.message));

          res.redirect('..');

      }).catch(error => console.log(error.message));
  })
return router
};
