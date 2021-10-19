const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const query = `
    SELECT id FROM users
    WHERE email = $1
    `

    db.query(query, [email])
      .then((result) => {
        console.log(result.rows)
        res.cookie('user_id', result.rows[0].id);
        res.redirect("/");
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: error.message });
      })
  })

  router.get('/', (req, res) => {

    res.render('pages/login');

  });
return router
};
