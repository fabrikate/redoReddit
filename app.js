var express = require('express');
var app = express()
var exphbs = require('express-handlebars');
var methodOverride = require('method-Override');
var bodyParser = require('body-Parser');
var request = require('request');
var mongoose = require('mongoose');
var session = require('cookie-session');
//TO DO: MIDDLEWARE
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

app.listen(3000, function() {
  console.log('Server is running on port 3000');
})
