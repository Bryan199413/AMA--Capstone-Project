// require('dotenv').config();
const bcrypt = require('bcrypt');
// const _ = require('lodash');
// const axios = require('axios');
// const otpGenerator = require('otp-generator');
// const client = require('twilio')(process.env.ACOUNT_SID, process.env.AUTH_TOKEN);
const userToken = require('../utils/generateToken')
const {User} = require('../Models/User');
// const {Otp} = require('../Models/Otp');




module.exports.signUpUser = async (req, res) => {
  try {
      const { userName, password, confirmPassword, phoneNumber } = req.body;

      if (password !== confirmPassword) {
          return res.status(400).json({ error: "Passwords don't match" });
      }

      const existingUser = await User.findOne({ userName });
      if (existingUser) {
          return res.status(400).json({ error: "Username already exists" });
      }

      const existingPhoneNumber = await User.findOne({ phoneNumber });
      if (existingPhoneNumber) {
          return res.status(400).json({ error: "Phone number already registered" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      const generateAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${userName}&radius=10&backgroundType=solid,gradientLinear&backgroundRotation=-320,-340,-350,-360,-330,-310,-300,-290,-280,-270,-260,-250,-240,-230,-220&earringsProbability=20&featuresProbability=0&glassesProbability=20&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

      const newUser = new User({
          userName,
          password:hashedPassword,
          phoneNumber,
          avatar: generateAvatar
      });
      
      if(newUser){
       userToken.generateUserTokenandCookie(newUser._id,res);
      await newUser.save();
      return res.status(201).json(newUser);
      }else{
        return res.status(400).json({error:"Invalid user Data"})
      }
      
      } catch (error) {
          console.error("Error in signUpUser:", error);
          return res.status(500).json({ error: "Internal Server Error" });
      }
};
  
  module.exports.loginUser = async (req,res) => {
    try {
      const{userName,password} = req.body;
      const user = await User.findOne({userName});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

      if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"})
      }

      userToken.generateUserTokenandCookie(user._id,res);
      return res.status(200).json({
        _id: user._id,
        username: user.userName,
        avatar: user.avatar 
      })
    } catch (error) {
      console.error("Error in LoginUser:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports.logoutUser = (req,res) => {
    try {
      res.cookie("jwt","",{maxAge: 0});
      res.status(200).json({message:"Logout successfully"});
    } catch (error) {
      console.error("Error in logoutUser:", error);
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