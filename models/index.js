//comment to add to github

var mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/reddit');

module.exports.Post = reqiure('.post');
module.exports.Comment = reqiure('.comment');
module.exports.User = reqiure('.user');
