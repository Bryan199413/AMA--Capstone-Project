import mongoose from "mongoose";
// const jwt = require('jsonwebtoken');

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
        isAdmin: {
            type: Boolean,
            default: false
        },
    },{timestamps:true}
    );

    const User = mongoose.model("User", userSchema);

    export default User;
// userSchema.methods.generateJWT = function (){
//     const token = jwt.sign({
//         _id:this._id,
//         number:this.number
//     },process.env.JWT_SECRET_KEY)
// }

