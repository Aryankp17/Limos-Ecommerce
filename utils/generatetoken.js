import jwt from 'jsonwebtoken';

export const generatetoken=(user)=>{
    const token = jwt.sign({ email:user.email,userid:user._id}, process.env.JWT_KEY);
    return token

}
export const admintoken = (admin)=>{
    const admintoken = jwt.sign({email:admin.email, id:admin._id },process.env.JWT_KEY2);
    return admintoken
}