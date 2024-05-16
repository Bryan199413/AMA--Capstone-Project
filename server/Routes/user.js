import express from "express";
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
         getAllBlockedUsers} from "../Controllers/user.js";

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

export default router;