var mongoose = require ('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

var Post = mongoose.model("Post", postSchema)

module.exports = Post;
