const express=require('express');
const authControllers=require('../controllers/auth.controller')
const router=express.Router();

router.get('/signup',authControllers.getSignUp);

router.get('/login',authControllers.getLogin);

router.post('/signup',authControllers.signUp);

router.post('/login',authControllers.logIn);

router.post('/logout',authControllers.logOut)


module.exports=router;