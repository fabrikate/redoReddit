var mongoose = require('mongoose');

var userSchema = new mongoose.userSchema({
  userName: String,
  password: String,
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  ]};
})

var User = mongoose.model('User', userSchema);
module.exports = User;