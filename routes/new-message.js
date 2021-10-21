const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('pages/new-message')
  })

  router.post("/", (req, res) => {

    const sendingUserId = Number(req.cookies['user_id']);
    const subject = req.body.subject;
    const body = req.body.body;

    // insert into THREADS first
    const threadsQuery = `
    INSERT INTO threads (subject, listing_id)
    VALUES ($1, 1) RETURNING id;
    `

    db.query(threadsQuery, [subject])
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
            VALUES ($1, $2), ($1, 1);
            `
            db.query(participantsQuery, [threadId, sendingUserId])

          }).catch(error => console.log(error.message));
      }).catch(error => console.log(error.message));

      res.redirect("/");
  })
return router
};
