import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({success: false, message: "No Authorization token provided"});
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(!tokenDecode || !tokenDecode.id){
            return res.json({success: false, message: "Not authorized"});
        }
        req.id = tokenDecode.id;
        next();
    }catch (error) {
        res.json({success: false, message: error.message});
    }
}
 
export default authUser;