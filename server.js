import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import UserRouter from './routes/userRouter.js';
import OwnerRouter from './routes/ownerRouter.js';
import ProductRouter from './routes/productRouter.js';
import IndexRouter from './routes/index.js';
import cookie from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

const app = express() 
app.set('view engine', 'ejs');
app.use(cookie());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static('public'));
app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  secret: 'keyboard cat'
}))
app.use(flash());



app.use('/',IndexRouter)
app.use('/User',UserRouter)
app.use('/Owner',OwnerRouter)
app.use('/Product',ProductRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})