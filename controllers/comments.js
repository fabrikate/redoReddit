//index
app.get('/posts/:post_id/comments', function (req,res){
  db.Post.findById(req.params.post_id).populate('comments').exec(function (err, zoo){
    res.render("comments/index");
  });
});

app.get('/posts/:post_id/comments/new', function (req, res){
  db.Post.findById(req.params.post_id, function (err, post){
    res.render('comments/new')cd
  }
})
//new

//create

//show

//edit

//delete