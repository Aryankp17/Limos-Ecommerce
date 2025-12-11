import mongoose from 'mongoose';


const ownerSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    Number:Number,
    gstin:String
    
})

const owner = mongoose.model('owner',ownerSchema)
export default owner;