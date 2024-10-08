import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
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
        isOnline:{
            type:Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },{timestamps:true}
    );

    const User = mongoose.model("User", userSchema);

    export default User;

