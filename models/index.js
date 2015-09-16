var mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/reddit_app');

module.exports.Post = require('./post');
module.exports.Comment = require('./comment');
module.exports.User = require('./user');
