import express from "express";
import { login, logout, signup, verifyOtp, generateAvatar, changeAvatar, getConversation } from "../Controllers/user.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post('/signup/verify',verifyOtp)

router.post("/login", login);

router.post("/logout", logout);

router.get("/",protectRoute,getConversation)

router.get("/generateAvatar",generateAvatar);

router.patch("/changeAvatar/:id",changeAvatar)




export default router;