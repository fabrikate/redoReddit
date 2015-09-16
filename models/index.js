var mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/reddit');

module.exports.Post = require('post');
module.exports.Comment = require('comment');
module.exports.User = require('user');
