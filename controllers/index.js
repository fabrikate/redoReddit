require('./posts');

app.get('/', function(req, res) {
  res.render('users/login');
})

app.get('*', function(req, res) {
  res.render('404');
})
