import express from "express";
import { login, logout, signup, getUsersForSidebar, } from "../Controllers/user.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/",protectRoute,getUsersForSidebar);
// router.post('/signup/verify',userController.verifyOtp)



export default router;