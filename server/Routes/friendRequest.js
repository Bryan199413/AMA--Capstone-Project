import express from "express";
import protectRoute from '../middleware/protectRoute.js'
import { cancelRequest, checkRequest, getFriendRequests, sendFriendRequest } from "../Controllers/friendRequest.js";

const router = express.Router();

router.post("/send/:id", protectRoute,sendFriendRequest);
router.get("/", protectRoute,getFriendRequests);
router.get("/check/:id",protectRoute,checkRequest);
router.post("/cancel/:id",protectRoute,cancelRequest);

export default router;