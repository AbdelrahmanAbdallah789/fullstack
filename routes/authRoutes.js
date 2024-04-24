const express = require('express');
const authrouter = express.Router();
const authController=require('../controllers/authController')
authrouter.get('/signup',authController.singup_get)
authrouter.post('/signup',authController.singup_post)
authrouter.get('/login',authController.login_get)
authrouter.post('/login',authController.login_post)
authrouter.get('/logout',authController.logout_get)
module.exports=authrouter;