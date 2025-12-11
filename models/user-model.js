import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    number:Number,
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    order:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:'product',
            },
            OrderedAt:{
                type:Date,
                default:Date.now
            },
            quantity:{
                type:Number,
                default:1
            },
            default:[]
        }
    ],
    wishlist:[
        {
            type:mongoose.Types.ObjectId,
            ref:'product',
            default:[]
        }
    ],
    profilepic:{
        Image:Buffer
    }
})

const user = mongoose.model('user',userSchema)
export default user;