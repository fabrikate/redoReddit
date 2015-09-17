var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
})

//userName and password authentication
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next()
    });
  });
});

userSchema.pre('remove', function(callback) {
  Post.remove({user: this._id}).exec();
  callback();
});

userSchema.methods.checkPassword = function(password, callback) {
  var user = this;
  console.log('password: ', password);
  console.log('user.password: ', user.password);
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if( isMatch ) {
      callback(null, user);
    }  else {
      callback(err, null);
    }
  });
};

userSchema.statics.authenticate = function(formData, callback) {
  this.findOne({
    name: formData.name
  }, function(err, user) {
    console.log('formdata password: ', formData.password);
    if(user === null) {
      callback('Invalid userName or password', null);
    } else {
      user.checkPassword(formData.password, callback);
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
