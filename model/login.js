import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        default:"xxxxxxxxxx"
    },
    address:{
        type:String,

    },
    email:{
        type:String,
        required:true
    }
});

const LoginModel = mongoose.model("login",loginSchema);
export default LoginModel;
