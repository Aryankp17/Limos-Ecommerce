import express from 'express';
import upload from "../config/multer-config.js";
import productModel from '../models/product-model.js'
import { isadminloggedin } from '../middleware/isloggedin.js';
import { updateproduct } from '../controller/product-controller.js';
import { createproduct } from '../controller/product-controller.js';


const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Product Router Working Fine');
})

router.post('/create',upload.single('image'),isadminloggedin,createproduct)

router.post('/update/:id',upload.single('image'),isadminloggedin,updateproduct)

export default router;