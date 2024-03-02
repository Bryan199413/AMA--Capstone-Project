// require('dotenv').config();
import bcrypt from "bcrypt";
import _ from "lodash";
// const axios = require('axios');
import otpGenerator from "otp-generator";
// const client = require('twilio')(process.env.ACOUNT_SID, process.env.AUTH_TOKEN);
import generateTokenAndSetCookie from "../utils/generateToken.js";
import User from "../Models/User.js";
import Otp from "../Models/Otp.js";

export const signup = async (req, res) => {
  try {
      const { username, password, confirmPassword, phoneNumber } = req.body;

      if (password !== confirmPassword) {
          return res.status(400).json({ error: "Passwords don't match" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ error: "Username already taken" });
      }
      
      const existingPhoneNumber = await User.findOne({ phoneNumber });
      if (existingPhoneNumber) {
          return res.status(400).json({ error: "Phone number already registered" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      const OTP = otpGenerator.generate(6,{digits: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets:false});
      const hashedOtp = await bcrypt.hash(OTP,salt)
      const generateAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}&radius=10&backgroundType=solid,gradientLinear&backgroundRotation=-320,-340,-350,-360,-330,-310,-300,-290,-280,-270,-260,-250,-240,-230,-220&earringsProbability=20&featuresProbability=0&glassesProbability=20&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
      console.log(OTP);

      const newOtp = new Otp({
        username,
        password:hashedPassword,
        phoneNumber,
        avatar:generateAvatar,
        otp:hashedOtp
      });
      
      await newOtp.save();
      return res.status(200).json({message:"Otp sent successfuly!"});
      } catch (error) {
          console.error("Error in signUp:", error);
          return res.status(500).json({ error: "Internal Server Error" });
      }
};

export const verifyOtp = async (req,res) => {
  try {
      const {phoneNumber,otp} = req.body;
      const otpHolder = await Otp.find({phoneNumber:phoneNumber});
      if(otpHolder.length === 0){
        return res.status(400).json({error:"You use an Expired OTP!"})
      };
      
      const rightOtpFind = otpHolder[otpHolder.length -1 ];
      const validUser = await bcrypt.compare(otp,rightOtpFind.otp);

      if(rightOtpFind.phoneNumber === phoneNumber && validUser){
          const newUser = new User(_.pick(rightOtpFind,["username","password","phoneNumber","avatar"]));
          if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            await Otp.deleteMany({phoneNumber:rightOtpFind.phoneNumber});
            return res.status(201).json(newUser);
            }else{
              return res.status(400).json({error:"Invalid user Data"})
            }
      }else{
        return res.status(400).json({error:"Your OTP was wrong!"})
      }
      } catch (error) {
          console.error("Error in verifyOtp:", error);
          return res.status(500).json({ error: "Internal Server Error" });
      }
};

export const login = async (req,res) => {
    try {
      const{username,password} = req.body;
      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

      if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"})
      }
      generateTokenAndSetCookie(user._id, res);

      return res.status(200).json({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      })
    } catch (error) {
      console.error("Error in LoginUser:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req,res) => {
    try {
      res.cookie("jwt","",{maxAge: 0});
      res.status(200).json({message:"Logout successfully"});
    } catch (error) {
      console.error("Error in logoutUser:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUsersForSidebar = async (req,res) => {
  try {
    const loggedInUserID = req.user._id;

    const filteredUsers = await User.find({_id: {$ne:loggedInUserID}}).select(["-password","-phoneNumber","-isAdmin"]);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// module.exports.signUp = async (req,res) => {
//   const user = await User.findOne({number:req.body.number});

//   if(user){
//     return res.status(400).send("User already registered!");
//   }

//   const OTP = otpGenerator.generate(6,{digits: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets:false});
  
//   const number = req.body.number;
//   console.log(OTP);

//   client.messages.create({
//     body: `Your OTP is ${OTP}`,
//     from: process.env.FROM,
//     to: number
//   })
//   .then(message => console.log(message.sid))
//   .catch(error => console.error(error));

//   const otp = new Otp({number: number, otp: OTP});
//   const salt = await bcrypt.genSalt(10)
//   otp.otp = await bcrypt.hash(otp.otp,salt);
//   const result = await otp.save();
//   return res.status(200).send("Otp send successfully");
// }

// module.exports.verifyOtp = async (req,res) => {
//  const otpHolder = await Otp.find({number:req.body.number});
  
//    if(otpHolder.length === 0){
//     return res.status(400).send("You are an Expired OTP!");
//    }
//    const rightOtpFind = otpHolder[otpHolder.length - 1];
//    const validUser = await bcrypt.compare(req.body.otp,rightOtpFind.otp);

//    if(rightOtpFind.number === req.body.number && validUser){
//     const user = new User(_.pick(req.body, ["number"]));
//     const token = user.generateJWT();
//     const result = await user.save();
//     const otpDeleteResult = await Otp.deleteMany({ number: req.body.number });

//     return res.status(200).send({
//         message:"User Registration Successfull!",
//         token:token,
//         data:result
//     });
//    }else{
//     return res.status(400).send("Your OTP was wrong!");
//    }
// }