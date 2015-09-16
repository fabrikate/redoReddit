app.get('/', function(req, res) {
  res.redirect('/posts');
})
require('./posts');

// app.get('*', function(req, res) {
//   res.render('404');
// })
