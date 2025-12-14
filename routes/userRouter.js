import express from 'express';
import {isloggedin} from '../middleware/isloggedin.js';
import productModel from '../models/product-model.js';
import userModel from '../models/user-model.js';
import { addtocart } from '../controller/product-controller.js';
import { addtowishlist } from '../controller/product-controller.js';
import { profileupdate } from '../controller/user-controller.js';
import upload from '../config/multer-config.js'


const router = express.Router();

router.get('/',isloggedin,async (req,res)=>{
    let success = req.flash('success')
    const products = await productModel.find()
    const user = await userModel.findOne({_id:req.user.userid}).populate('cart')
    res.render('home',{success, products,user})
})
router.get('/wishlist',isloggedin,async (req,res)=>{
    let success = req.flash('success')
    const user = await userModel.findOne({_id:req.user.userid}).populate('wishlist')
    const products = user.wishlist
    res.render('wishlist',{success, products,user})
})
router.get('/wishlist/:id',isloggedin, addtowishlist)
router.get('/cart/:id',isloggedin,addtocart)

router.get('/profile',isloggedin, async (req,res)=>{
    let success = req.flash('success')
    const user = await userModel.findOne({_id:req.user.userid})
    res.render('profile',{user,success})
})

router.post('/profileupdate',upload.single('profilepic'),isloggedin,profileupdate)

router.get('/cart',isloggedin,async (req,res)=>{
    const user = await userModel.findOne({_id:req.user.userid}).populate({path:'cart.product'})
    const carts = user.cart
    res.render('cart',{user,carts})
})

export default router;