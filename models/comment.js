var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  commentText: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
