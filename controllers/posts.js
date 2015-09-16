var db = require('../models/index');
//index
app.get('/posts', function (req,res){
  db.Post.find({}, function(err, posts){
    res.render('posts/index', {posts: posts})
  })
});

//new
app.get('/posts/new', function (req,res){
  res.render('posts/new')
});

//create
app.post('/posts', function (req,res){
  db.Post.create({title: req.body.title, text: req.body.text}, function (err, user){
    if (err){
      res.render('/posts/new')
    } else {
      res.redirect('/posts')
    }
  });
});

//show
app.get('posts/:post_id', function (req,res){ //ask if we can string two populates together
  db.Post.findById(req.params.id).populate('comments').exec(function (err,post){
    res.render('/posts/show', {post: post})
  });
});

//edit
app.get('posts/:post_id/edit', function (req,res){
  db.Post.findById(req.params.id, function (err, post){
    res.render('posts/edit', {post: post})
  });
});

//update
app.put('posts/:post_id', function (req,res){
  db.Post.findByIdAndUpdate(req.params.id, {title: req.body.title, text: req.body.text}, function (err,post){
    if (err){
      res.render('posts/edit')
    } else {
      res.redirect('/posts/:post_id')
    }
  })
})

//destroy
app.delete('posts/:post_id', function (req,res){
  db.Post.findByIdAndRemove (req.params.id, function (err,post){
    if (err){
      res.render('/posts/show');
    } else {
      res.redirect('/posts');
    }
  });
});


