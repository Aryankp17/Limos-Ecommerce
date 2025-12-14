import mongoose from 'mongoose';
import config from 'config';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const dbg = debug('development:mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    dbg('Connected to MongoDB');
})
.catch((err)=>{
    dbg('Error connecting to MongoDB:', err);
})
export default mongoose.connection;
