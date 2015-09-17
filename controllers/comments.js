var db = require('../models/index');
//index
app.get('/posts/:post_id/comments', function (req,res) {
  db.Post.findById(req.params.post_id).populate('comments').exec(function (err, post) {
    res.render("comments/index", {post: post});
  });
});

//new
app.get('/posts/:post_id/comments/new', function (req, res) {
  db.Post.findById(req.params.post_id, function (err, post) {
    res.render('comments/new', {post: post})
  });
});

//create
app.post('/posts/:post_id/comments', function (req,res) {
  db.Comment.create({commentText: req.body.commentText}, function (err, comment) {
    if (err){
      res.render('comments/new')
    } else {
      db.Post.findById(req.params.post_id, function (err, post) {
        post.comments.push(comment);
        // post.comment = post.id;
        comment.post = post._id;
        comment.save();
        post.save();
        res.redirect('/posts/' + post._id + '/comments');
      });
    };
  });
});

//show
app.get('/posts/:post_id/comments/:comment_id', function (req,res) {
  db.Comment.findById(req.params.comment_id).populate('post').exec( function (err, comment) {
    console.log('show comment is sending: ', comment);
    res.render('comments/show', {comment: comment})
  });
});

//edit
app.get('/posts/:post_id/comments/:comment_id/edit', function (req,res) {
  db.Comment.findById(req.params.comment_id).populate('post').exec(function (err, comment) {
    console.log('comment the id of sending is: ', comment._id)
    res.render('comments/edit', {comment: comment})
  });
});

//update
app.put('/posts/:post_id/comments/:comment_id', function (req,res) {
  db.Comment.findByIdAndUpdate(req.params.comment_id, {commentText: req.body.commentText}, function (err, comment) {
    if (err){
      res.render('comments/edit')
    } else {
      res.redirect(req.params.comment_id);
    };
  });
});

//delete
app.delete('/posts/:post_id/comments/:comment_id', function (req,res) {
  db.Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
    if (err){
      res.render('comments/edit')
    } else {
      res.redirect('/posts/:post_id/comments')
    };
  });
});
