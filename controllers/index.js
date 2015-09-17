app.get('/', function(req, res) {
  res.redirect('/posts');
})
require('./posts');
require('./comments');

// sign up route
app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});
app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  console.log(newUser)
  db.User.create(newUser, function(err, user) {
    if(user) {
      req.login(user);
      console.log('user is ',user);
      res.redirect('/posts');
    } else {
      console.log(err);
      res.render('users/signup');
    }
  });
});

//login route
app.get('/login', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/login');
});

app.post('/login', function(req, res) {
  db.User.authenticate(req.body.user, function(err, user) {
    if(!err && user !== null) {
      req.login(user);
      res.redirect('/posts');
    } else {
      res.render('users/login', console.log('Error'));
    }
  });
});

//log out
app.get('/logout', function(req, res) {
  req.logout();
  console.log(req.session.id);
  res.redirect('/login');
})

app.get('*', function(req, res) {
  res.render('404');
})
