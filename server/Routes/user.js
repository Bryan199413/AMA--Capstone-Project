import express from "express";
import protectAdminRoute from "../middleware/protectAdminRoute.js";
import protectRoute from "../middleware/protectRoute.js";
import { login, 
         logout, 
         signup, 
         verifyOtp, 
         generateAvatar, 
         changeAvatar, 
         getConversation, 
         blockUser, 
         unblockUser,
         getAllBlockedUsers,
         reportUser,
         getAllReportedUsers,
         submitFeedback,
         getAllFeedback,
         banUser,
         getTotalUsers,
         verifyAccount,
         verifyOtpFromResetPassword,
         setNewPassword,
         getOnlineUsers,
         getBreakDownReport,
         getAllBannedUsers,
         unbanUser} from "../Controllers/user.js";

const router = express.Router();

router.post("/signup", signup);

router.post('/signup/verify',verifyOtp)

router.post("/login", login);

router.post("/logout", logout);

router.get("/",protectRoute,getConversation)

router.get("/generateAvatar",generateAvatar);

router.patch("/changeAvatar/:id",changeAvatar);

router.post("/block/:id",protectRoute,blockUser)

router.delete('/unblock/:id',protectRoute,unblockUser);

router.get("/blockedUsers",protectRoute,getAllBlockedUsers);

router.post("/report/:id",protectRoute,reportUser);

router.get("/reported/users",protectAdminRoute,getAllReportedUsers);

router.get('/banned/Users',protectAdminRoute,getAllBannedUsers)

router.post("/feedback",protectRoute,submitFeedback);

router.post("/verifyAccount",verifyAccount);

router.post("/verifyOtpFromResetPassword",verifyOtpFromResetPassword);

router.post("/setNewPassword",setNewPassword);

router.get("/allFeedback",protectAdminRoute,getAllFeedback);

router.post("/ban/:id",protectAdminRoute,banUser);

router.delete('/unban/:id',protectAdminRoute,unbanUser);

router.get('/totalUsers', protectAdminRoute, getTotalUsers);

router.get('/breakdownReport/:id',protectAdminRoute,getBreakDownReport);

router.get("/getOnlineUsers",getOnlineUsers);

export default router;