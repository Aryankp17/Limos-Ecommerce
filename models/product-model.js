import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    backgroundcolor: {
        type: String,
        default: '#E4E4E4',
    },
    panelcolor: {
        type: String,
        default: '#9E9E9E',
    },
    textcolor: {
        type: String,
        default: '#000000',
    }
})

const product = mongoose.model('product',productSchema)
export default product;