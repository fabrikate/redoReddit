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

postSchema.pre('remove', function(callback) {
  Comment.remove({post: this._id}).exec();
  callback();
});

var Post = mongoose.model("Post", postSchema)

module.exports = Post;
