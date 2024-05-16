// require('dotenv').config();
import bcrypt from "bcrypt";
import _ from "lodash";
// const axios = require('axios');
import otpGenerator from "otp-generator";
// import twilio from 'twilio';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Conversation from "../Models/Conversation.js"
import User from "../Models/User.js";
import Friend from "../Models/Friend.js";
import BlockedUser from "../Models/BlockedUser.js"
import Otp from "../Models/Otp.js";

// const client = twilio(process.env.ACOUNT_SID, process.env.AUTH_TOKEN);

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
      const generateAvatar = `https://api.dicebear.com/8.x/initials/svg?seed=${username}`;
      console.log(OTP);

      const newOtp = new Otp({
        username,
        password:hashedPassword,
        phoneNumber,
        avatar:generateAvatar,
        otp:hashedOtp
      });
      
      await newOtp.save();
      return res.status(200).json({message:"OTP was sent!"});
      } catch (error) {
          console.error("Error in signup:", error);
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
          await newUser.save();
          await Friend.create({userId:newUser.id});
          await BlockedUser.create({userId:newUser.id})
          await Otp.deleteMany({phoneNumber:rightOtpFind.phoneNumber});
          
          const user = await User.findOne({username:newUser.username});    
          if(user){
            generateTokenAndSetCookie(user._id, res);
            return res.status(200).json({
              _id: user._id,
              username: user.username,
              avatar: user.avatar,
            })
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

export const getConversation = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;

    const filteredConversations = await Conversation.find({
      participants: loggedInUserID 
    }).select("-messages")
      .populate({
        path: "participants",
        match: { _id: { $ne: loggedInUserID } },
        select: "_id username avatar updatedAt"
      });


    const formattedData = filteredConversations.map(conversation => {
      const participantsData = conversation.participants.map(participant => ({
        _id: participant._id,
        username: participant.username,
        avatar: participant.avatar,
        updatedAt: participant.updatedAt
      }));
      
      return {
        conversationId: conversation._id,
        ...participantsData[0] 
      };
    });
                                   
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error in getConversation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const generateAvatar = (req,res) => {
  try {
    const seedPhrase = otpGenerator.generate(20,{ specialChars: false,});
    const generateAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seedPhrase}&radius=10&backgroundType=solid,gradientLinear&backgroundRotation=-320,-340,-350,-360,-330,-310,-300,-290,-280,-270,-260,-250,-240,-230,-220&earringsProbability=20&featuresProbability=0&glassesProbability=20&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    res.status(200).json(generateAvatar)
  } catch (error) {
    console.error("Error in generateAvatar:", error); 
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const changeAvatar = async (req, res) => {
  try {
    const { id: userId } = req.params; 
    const newAvatarUrl = req.body.avatar; 
    const user = await User.findOneAndUpdate({ _id: userId }, { avatar: newAvatarUrl }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.status(200).json({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      })
  } catch (error) {
    console.error("Error in changeAvatar:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const blockUser = async (req, res) => {
  try {
      const { id: userToBlockId } = req.params;
      const userId = req.user._id;

      if (userToBlockId === userId) {
          return res.status(400).json({ message: "Cannot block yourself." });
      }

      const userExists = await User.exists({ _id: userId });
      const userToBlockExists = await User.exists({ _id: userToBlockId });

      if (!userExists || !userToBlockExists) {
          return res.status(404).json({ message: "User not found." });
      }

      const alreadyBlocked = await BlockedUser.exists({
          userId,
          blockedUsers: { $in: [userToBlockId] }
      });

      if (alreadyBlocked) {
          return res.status(400).json({ message: "User already blocked." });
      }

      await BlockedUser.findOneAndUpdate(
          { userId },
          { $push: { blockedUsers: userToBlockId } },
          { upsert: true }
      );

      return res.status(201).json({ message: "User blocked successfully." });
  } catch (error) {
      console.log("Error in blockUser controller: ", error.message);
      return res.status(500).json({ error: "Internal server error" });
  }
};

export const unblockUser = async (req,res) => {
  try {
    const { id:unblockUserId } = req.params;
    const loggedInUserID = req.user._id;

    await BlockedUser.findOneAndUpdate(
        { userId: loggedInUserID },
        { $pull: { blockedUsers: unblockUserId } }
    );

    res.status(200).json({ message: 'Successfully unblocked user.' });
} catch (error) {
    console.error('Error in unBlockUser:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
}

export const getAllBlockedUsers = async (req,res) => {
    try {
        const loggedInUserID = req.user._id;

        const blockedUsers = await BlockedUser.findOne({ userId: loggedInUserID }).populate({
            path: 'blockedUsers',
            select: 'userId avatar username _id'
        });

        if (!blockedUsers || !blockedUsers.blockedUsers.length) {
            return res.status(200).json([]);
        }

        const blockedData = blockedUsers.blockedUsers.map(blockedUser => ({
            avatar: blockedUser.avatar,
            username: blockedUser.username,
            _id: blockedUser._id
        }));

        res.status(200).json(blockedData);
    } catch (error) {
        console.error('Error in getAllBlockedUsers:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};


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