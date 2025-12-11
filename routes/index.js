import express from 'express';
import {registeruser,loginuser} from '../controller/auth-controller.js';


const router = express.Router();

router.get('/',(req,res)=>{
    const error  = req.flash('error')
    const success = req.flash('success');
    res.render('register',{error,success})
})
router.get('/register',(req,res)=>{
    const error = req.flash('error')
    const success = req.flash('success')
    res.render('register',{error,success})
})
router.get('/login',(req,res)=>{
    let error = req.flash('error')
    let success = req.flash('success')
    res.render('login',{error,success})
})
router.get('/logout',(req,res)=>{
    res.cookie('token','')
    const success = 'You have been logged out successfully'
    req.flash('success',success)
    res.redirect('/login')
})



// post routes
router.post('/register', registeruser)
router.post('/login',loginuser)


export default router;