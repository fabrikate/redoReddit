var db = require('../models/index');
//index
app.get('/posts', function (req,res){
  db.Post.find({}, function(err, posts){
    res.render('posts/index', {posts: posts})
  })
});

//new
app.get('/posts/new', routeMiddleware.ensureLoggedIn, function (req,res){
  res.render('posts/new')
});

//create
app.post('/posts', function (req,res){
  db.Post.create({title: req.body.title, text: req.body.text}, function (err, post) {
    if(err) {
      console.log(err)
      res.render('posts/new');
    } else {
      console.log('req.session.id:', req.session.id)
      db.User.findById(req.session.id, function(err, user) {
        user.posts.push(post);
        post.user = user._id;
        post.save();
        user.save();
        res.redirect('/posts')
      })
    }
  });
});

//show
app.get('/posts/:id', function (req,res){ //ask if we can string two populates together
  db.Post.findById(req.params.id).populate('comments').exec(function (err,post){
    res.render('posts/show', {post: post})
  });
});

//edit
app.get('/posts/:id/edit', routeMiddleware.ensureLoggedIn, function (req,res){
  db.Post.findById(req.params.id, function (err, post){
    res.render('posts/edit', {post: post})
  });
});

//update
app.put('/posts/:id', function (req,res){
  db.Post.findByIdAndUpdate(req.params.id, {title: req.body.title, text: req.body.text}, function (err,post){
    if (err){
      res.render('posts/edit')
    } else {
      res.redirect('/posts/' + req.params.id);
    }
  })
})

//destroy
app.delete('/posts/:id', function (req,res){
  db.Post.findByIdAndRemove (req.params.id, function (err,post){
    if (err){
      res.render('posts/show');
    } else {
      res.redirect('/posts');
    }
  });
});


