import mongoose from "mongoose";

const otpSchema = new mongoose.Schema ({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    phoneNumber:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date, default:Date.now, index:{expires:300}}
},{timestamps:true}
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;