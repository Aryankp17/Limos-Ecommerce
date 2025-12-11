import jwt from 'jsonwebtoken';

export const isloggedin = (req,res,next)=>{
    if(!req.cookies.token){
        req.flash('error', 'please login again')
         return res.redirect('/');
    }
    try {
        jwt.verify(req.cookies.token, process.env.JWT_KEY, function(err, decoded) {
            if(err) return res.status(500).redirect('/')
            req.user =  decoded;
        });
        next();
        
    } catch (error) {
        res.send(error)
        
    }

}
export const isadminloggedin = (req,res,next)=>{
    if(!req.cookies.token){
        req.flash('error', 'please login again as admin')
         return res.redirect('/owner');
    }
    try {
        jwt.verify(req.cookies.token, process.env.JWT_KEY2, function(err, decoded) {
            if(err) return res.status(500).redirect('/owner')
                req.admin = decoded
            next();
           
        });
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}