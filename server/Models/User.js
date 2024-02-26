const {Schema,model} = require('mongoose');
// const jwt = require('jsonwebtoken');

const userSchema = Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
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
},{timestamps:true});

// userSchema.methods.generateJWT = function (){
//     const token = jwt.sign({
//         _id:this._id,
//         number:this.number
//     },process.env.JWT_SECRET_KEY)
// }

module.exports.User = model('User',userSchema)