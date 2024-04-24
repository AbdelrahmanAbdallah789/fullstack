const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const authRoutes =require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authmiddleware');
const exp = require('constants');
const { blog_details } = require('./controllers/blogController');
const url=('mongodb+srv://abdo:abdo1234@cluster0.kj2ida2.mongodb.net/node')
mongoose.connect(url)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
//---------------------------------------------->
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.get('*', checkUser);
app.use('/blogs',blogRoutes);
app.use(authRoutes)
//---------------------------------------------->
app.get('/home',(req,res)=>{
  res.render('home')
})
app.get('/',(req, res) => {
  res.redirect('/home');
});
app.get('/create',requireAuth,(req,res)=>{
    res.render('create' ,{title: 'create'})
})
app.get('/book',(req,res)=>{
  res.render('book')
})
app.get('/pages',(req,res)=>{
  res.render('pages')
})
app.get('/content',(req,res)=>{
  res.render('content')
})
app.get('/contact',(req,res)=>{
  res.render('contact')
})
app.get('/about',(req,res)=>{
    res.render('about' ,{title: 'about'});
});
app.use((req,res)=>{
res.status(404).render('404' ,{title: '404'})
})


