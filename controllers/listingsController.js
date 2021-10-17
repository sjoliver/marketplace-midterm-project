const Listing = require('../models/listing');
const User = require('../models/user');

const async = require('async');

exports.index = function(req, res) {

  async.parallel({
    listing_count: function(callback) {
      Listing.getAll()
        .exec(callback);
    }
  }, function(err, results) {
      res.render('index', { title: 'Gnome Home Page', error: err, data: results });
  });
};

exports.findAll = (req, res) => {
  Listing.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving listings."
      });
    else res.send(data);
  });
};
