app.get('/')//BREA

app.get('*', function(req, res) {
  res.render('404');
})
