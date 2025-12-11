import express from 'express';
import ownermodel from '../models/owner-model.js';
import { admin } from '../controller/auth-controller.js';
import bcrypt from 'bcrypt';
import {isadminloggedin} from '../middleware/isloggedin.js';
import productModel from '../models/product-model.js';
import { deleteproduct } from '../controller/product-controller.js';
import { deleteall } from '../controller/product-controller.js';



const router = express.Router();

router.get('/',(req,res)=>{
    const error = req.flash('error')
    res.render('admin-login',{error})
})
router.get('/home',isadminloggedin,async (req,res)=>{
    const success = req.flash('success')
    const products = await productModel.find()
    res.render('admin',{success, products})
})
router.get('/createproduct',isadminloggedin,(req,res)=>{
    res.render('CreateProduct')
})
router.get('/editproduct/:id',isadminloggedin,async (req,res)=>{
    const product = await productModel.findById(req.params.id)
    if(!product) return res.status(404).send('Product Not Found')
    res.render('editproduct',{product})
})

router.get('/deleteproduct/:id',isadminloggedin,deleteproduct)

router.get('/deleteall',isadminloggedin,deleteall)


if(process.env.NODE_ENV==='development'){
    router.post('/create',async (req,res)=>{
        let{fullname,email,password,Number,gstin} = req.body
        const owner = await ownermodel.find()
        if(owner.length>0){
            return res.status(500).send('Owner Already Exists')
        }
        bcrypt.genSalt(15, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
               const newOwner = await ownermodel.create({fullname,email,password:hash,Number,gstin})
            res.status(200).send(newOwner) 
            });
        });
        

    })

}

//post request
router.post('/',admin)



export default router;