const Blog = require('../models/blog');
module.exports.blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blog', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports.blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}
module.exports.blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}
module.exports.blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports.blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}
