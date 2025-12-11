
import productModel from "../models/product-model.js";
import { isadminloggedin } from "../middleware/isloggedin.js";
import {isloggedin} from '../middleware/isloggedin.js';
import userModel from '../models/user-model.js';

export const updateproduct = async (req, res) => {
  try {
    let { name, price, discount, backgroundcolor, panelcolor, textcolor } =
      req.body;
    await productModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        price,
        discount,
        backgroundcolor,
        panelcolor,
        textcolor,
      },
      { new: true }
    );
    if (req.file) {
      await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          image: req.file.buffer,
        },
        { new: true }
      );
    }
    req.flash("success", "Product Updated Successfully"),
      res.redirect("/owner/home");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createproduct = async (req,res)=>{
    let{name,price,discount,backgroundcolor,panelcolor,textcolor} = req.body
    const product = await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        backgroundcolor,
        panelcolor,
        textcolor

    })
    req.flash('success','Product Created Successfully'),res.redirect('/owner/home')
};
export const deleteproduct = async (req,res)=>{
  try {
    await productModel.findOneAndDelete({_id:req.params.id})
    req.flash('success','Product Deleted Successfully'),res.redirect('/owner/home')
    
  } catch (error) {
    res.status(500).send(error.message);
  }

}
export const deleteall = async  (req,res)=>{
  try {
    await productModel.deleteMany({})
    req.flash('success','All Products Deleted Successfully'),res.redirect('/owner/home')
    
  } catch (error) {
    res.status(500).send(error.message);
    
  }

}
export const addtocart = async (req,res)=>{
    const product = await productModel.findOne({_id:req.params.id})
    if(!product) return req.flash('error','Something Went Wrong'),res.redirect('/user/')
    const user = await userModel.findOne({_id:req.user.userid})
    const cartitem = user.cart.findIndex((i)=>i.product.toString()=== req.params.id)
    if(cartitem === -1){
        user.cart.push({product:product._id})
        req.flash('success','Product added to cart')
    }else{
        user.cart.splice(cartitem,1)
        req.flash('success','Product removed from cart')
    }
    await user.save()
    
    res.redirect('/user/')
};

export const addtowishlist = async (req,res)=>{
    const product = await productModel.findOne({_id:req.params.id})
    if(!product) return req.flash('error','Something Went Wrong'),res.redirect('/user/')
    const user = await userModel.findOne({_id:req.user.userid})

    const wishlistindex = user.wishlist.indexOf(req.params.id)
    if(wishlistindex === -1){
        user.wishlist.push(product._id)
        req.flash('success','Product added to wishlist')
    }else{
        user.wishlist.splice(wishlistindex,1)
        req.flash('success','Product removed from wishlist')
    }
    await user.save()
    
    res.redirect('/user/')
};