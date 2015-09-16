var express = require('express');
app = express()
var exphbs = require('express-handlebars');
var methodOverride = require('method-Override');
var bodyParser = require('body-Parser');
var request = require('request');
var mongoose = require('mongoose');
var session = require('cookie-session');
var bcrypt = require('bcrypt');
var loginMiddleware = require('./middleware/loginHelper');
var routeMiddleware = require('./middleware/routeHelper');
var db = require('./models');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Set up Cookie Session
app.use(session({
  maxAge: 3600000,
  secret: 'illnevertell',
  name: 'redditCookie'
}));

//use login middleware
app.use(loginMiddleware);

require('./controllers/index');

// homepage
app.get('/', function(req, res) {
  res.redirect('/posts');
});

// sign up route
app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function(err, user) {
    if(user) {
      req.login(user);
      req.redirect('/posts');
    } else {
      console.log(err);
      res.render('signup');
    }
  });
});

//login route
app.get('/login', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  db.User.authenticate(req.body.user, function(err, user) { //TO DO: Write authenticate function! ks
    if(!err && user !== null) {
      req.login(user);
      res.redirect('/posts');
    } else {
      res.render('login', console.log('Error'));
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});