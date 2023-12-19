import {config} from "dotenv";
config();
import jwt from "jsonwebtoken";
const fetchUser = (req,res,next)=>{
    const token = req.header("auth_token");
    if(!token){
        return res.status(401).json({success:false,msg:"Token is not valid"});
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Token is not valid"});
    }
}
export default fetchUser;

