import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import _ from "lodash";
import otpGenerator from "otp-generator";
import twilio from 'twilio';
import { getReceiverSocketId, io } from "../socket/socket.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Conversation from "../Models/Conversation.js"
import User from "../Models/User.js";
import Friend from "../Models/Friend.js";
import BlockedUser from "../Models/BlockedUser.js"
import Otp from "../Models/Otp.js";
import OtpForResetPassword from "../Models/OtpForResetPassword.js"
import ReportedUser from "../Models/ReportedUsers.js";
import Feedback from "../Models/Feedback.js";
import BannedUser from "../Models/BannedUser.js";

const client = twilio(process.env.ACOUNT_SID, process.env.AUTH_TOKEN);

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

      const newOtp = new Otp({
        username,
        password:hashedPassword,
        phoneNumber,
        avatar:generateAvatar,
        otp:hashedOtp
      });
      
      await newOtp.save();

      console.log(OTP);

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
      
      const isBanned = await BannedUser.exists({ userId: user._id });
      if (isBanned) {
        return res.status(403).json({ error: "Your account is permanently banned.You have violated our community guidelines." });
      }

      generateTokenAndSetCookie(user._id, res);

      return res.status(200).json({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        isAdmin:user.isAdmin
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

      const blockedUser = await BlockedUser.findOneAndUpdate(
          { userId },
          { $push: { blockedUsers: userToBlockId } },
          { upsert: true }
      );
      
      const receiverSocketId = getReceiverSocketId(userToBlockId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("blockedUser",blockedUser);
      }
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

export const reportUser = async (req,res) => {
  try {
    const loggedInUserID = req.user._id;
    const { id: reportedId } = req.params;
    const { reason, description } = req.body;

    const reportedUser = await User.findById(reportedId);
    const reporterUser = await User.findById(loggedInUserID);
    const newReport = new ReportedUser({
      userId: reportedId,
      username:reportedUser.username,
      reportedBy: loggedInUserID,
      reporterUsername:reporterUser.username,
      reason,
      description,
    });

   
    await newReport.save();

    res.status(200).json({ message: 'User successfully reported.' });
    
} catch (error) {
    console.error('Error in reportUser:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
}

export const submitFeedback = async (req, res) => {
  try {
    const { feedbackText } = req.body;
    const userId = req.user._id;
    const username = await User.findById(userId);
    const feedback = new Feedback({
      userId,
      feedbackText,
      username:username.username
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error in submitFeedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Reset password 
export const verifyAccount = async (req, res) => {
  try {
    const { username, phoneNumber } = req.body;

    const userByUsername = await User.findOne({ username });

    if (!userByUsername) {
      return res.status(404).json({ error: 'Username not found' });
    }

    const userByPhoneNumber = await User.findOne({ username, phoneNumber });

    if (!userByPhoneNumber) {
      return res.status(404).json({ error: 'Phone number does not match the username' });
    }
    const salt = await bcrypt.genSalt(10);
    const OTP = otpGenerator.generate(6,{digits: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets:false});
    const hashedOtp = await bcrypt.hash(OTP,salt)
     
    const newOtp = new OtpForResetPassword({
      otp:hashedOtp,
      phoneNumber
    });
    
    await newOtp.save();

    console.log(OTP);

    // client.messages
    // .create({
    //   body: 'Hello from twilio-node',
    //   to: phoneNumber,
    //   from: process.env.FROM,
    // })
    // .then((message) => console.log(message.sid));

    res.status(200).json({message:"OTP was sent!"});
  } catch (error) {
    console.error('Error in verifyAccount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyOtpFromResetPassword = async (req,res) => {
  try {
    const {phoneNumber,otp} = req.body;
    const otpHolder = await OtpForResetPassword.find({phoneNumber:phoneNumber});
      if(otpHolder.length === 0){
        return res.status(400).json({error:"You use an Expired OTP!"})
      };
       
      const rightOtpFind = otpHolder[otpHolder.length -1 ];
      const validUser = await bcrypt.compare(otp,rightOtpFind.otp);
      
      if(rightOtpFind.phoneNumber === phoneNumber && validUser){

        await OtpForResetPassword.deleteMany({phoneNumber:rightOtpFind.phoneNumber});
        res.status(200).json({message:"Verified!"})
      }else{
        return res.status(400).json({error:"Your OTP was wrong!"})
      }
      
  } catch (error) {
    console.error("Error in verifyOtpFromResetPassword:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const setNewPassword = async (req,res) => {
  try {
    const {phoneNumber,newPassword,confirmPassword} = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(newPassword,salt);
    await User.findOneAndUpdate(
      { phoneNumber, phoneNumber },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({ message: "Password updated successfully"});
  } catch (error) {
    console.error("Error in setNewPassword:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//admin controller

export const getAllReportedUsers = async (req, res) => {
  try {
    const reportedUsers = await ReportedUser.find().select('_id userId username reportedBy reporterUsername reason description timestamp');

    res.status(200).json(reportedUsers);
  } catch (error) {
    console.error('Error in getAllReportedUsers:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().select('userId feedbackText _id username timestamp');

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error in getAllFeedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const banUser = async (req, res) => {
  try {
    const { id:userId } = req.params;
    const { reason, description } = req.body;
    const bannedBy = req.user._id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const admin = await User.findById(bannedBy);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }


    const banRecord = await BannedUser.create({
      userId,
      reason,
      description,
      bannedBy,
    });

    await ReportedUser.deleteMany({userId:userId});

    const receiverSocketId = getReceiverSocketId(userId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("banUser");
		}

    res.status(200).json({ message: 'User banned successfully', banRecord });
  } catch (error) {
    console.error('Error in banUser:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
      const userCount = await User.countDocuments({});
      res.status(200).json(userCount);
  } catch (error) {
      console.error('Error in getTotalUsers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBreakDownReport = async (req,res) => {
  try {
    const {id:userId} = req.params;
    const hateSpeechCount = await ReportedUser.find({userId:userId, reason:'Hate Speech'});
    const harrasmentOrBullyingCount = await ReportedUser.find({userId:userId,reason:'Harassment or Bullying'});
    const spamOrAdvertisingCount = await ReportedUser.find({userId:userId,reason:'Spam or Advertising'});
    const privacyViolationsCount = await ReportedUser.find({userId:userId,reason:'Privacy Violations'});
    const underageUserCount = await ReportedUser.find({userId:userId,reason:'Underage User'});
    let hateSpeech = 0 ;
    let harrasmentOrBullying = 0 ;
    let spamOrAdvertising = 0;
    let privacyViolations = 0;
    let underageUser = 0;

    if(hateSpeechCount) {
      hateSpeech = hateSpeechCount.length;
    }
    
    if(harrasmentOrBullyingCount) {
      harrasmentOrBullying = harrasmentOrBullyingCount.length;
    }

    if(spamOrAdvertisingCount) {
      spamOrAdvertising = spamOrAdvertisingCount.length;
    }

    if(privacyViolationsCount) {
      privacyViolations = privacyViolationsCount.length;
    }

    if(underageUserCount) {
      underageUser = underageUserCount.length;
    }
    
    const breakDown = {
      hateSpeech:hateSpeech,
      harrasmentOrBullying:harrasmentOrBullying,
      spamOrAdvertising:spamOrAdvertising,
      privacyViolations:spamOrAdvertising,
      underageUser:underageUser
    }

    res.status(200).json(breakDown);
  } catch (error) {
    console.error('Error in getBreakDownReport:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// for non user 

export const getOnlineUsers = async (req, res) => {
  try {
    const onlineUsers = await User.find({ isOnline: true });

    if (onlineUsers.length) {
      res.status(200).json(onlineUsers.length);
    } else {
      res.status(200).json(0);
    }
  } catch (error) {
    console.error('Error in getOnlineUsers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


