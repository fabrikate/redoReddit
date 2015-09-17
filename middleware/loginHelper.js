var db = require('../models');

var loginHelpers = function(req, res, next) {
  req.login = function (user) {
    console.log(user._id)
    req.session.id = user._id;
  }

  req.logout = function() {
    req.session.id = null;
  };
  next();
};

module.exports = loginHelpers;
