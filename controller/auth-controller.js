import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { generatetoken } from "../utils/generatetoken.js";
import { admintoken } from "../utils/generatetoken.js";
import ownerModel from "../models/owner-model.js";

export const registeruser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    email = email.toLowerCase();
    const user = await UserModel.findOne({ email });
    const owner = await ownerModel.findOne({ email });

    if (user || owner)
      return (
        req.flash("error", "User already exists"),
        res.status(400),
        res.redirect("/login")
      );

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        const newuser = await UserModel.create({
          fullname,
          password: hash,
          email,
        });
        const token = generatetoken(newuser);
        res.cookie("token", token);
        req.flash("success", "Registration Successful,please login again"),
          res.redirect("/login");
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const loginuser = async (req, res) => {
  try {
    let{email,password} =  req.body
    email = email.toLowerCase();
    const user = await UserModel.findOne({email})
    if(!user){
      return req.flash('error','Incorrect Credentials'),res.redirect('/login')
    }
      bcrypt.compare(password, user.password, function(err, result) {
        if(!result){
          return req.flash('error','Incorrect Credentials'),res.redirect('/login')
        } 
        const token = generatetoken(user) 
        res.cookie('token',token)
        req.flash('success','Welcome to Limos!'),res.redirect('/user')         
      });
    
  } catch (error) {
    res.status(400).send(error.message)
    
  }
};
export const admin = async (req, res) => {
  try {
    let { email, password } = req.body;
    const owner = await ownerModel.findOne({ email });
    if (!owner) return req.flash("error", "Incorrect Credentials"), res.redirect("/owner");
    bcrypt.compare(password, owner.password, function (err, result) {
        if (!result) return req.flash("error", "Incorrect Credentials"), res.redirect("/owner");
        res.cookie("token", admintoken(owner));
        req.flash("success", "Welcome to Limos!"), res.redirect('/owner/home');
    });
    
  } catch (error) {
    res.status(400).send(error)
    
  }
};
