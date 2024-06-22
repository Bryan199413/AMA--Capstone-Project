import mongoose from "mongoose";

const otpForResetPasswordSchema = new mongoose.Schema ({
    otp:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    createdAt:{type:Date, default:Date.now, index:{expires:300}}
},{timestamps:true}
);

const OtpForResetPassword = mongoose.model("OtpForResetPassword", otpForResetPasswordSchema);

export default OtpForResetPassword;