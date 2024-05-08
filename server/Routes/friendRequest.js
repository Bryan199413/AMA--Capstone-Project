import express from "express";
import protectRoute from '../middleware/protectRoute.js'
import { acceptFriendRequest,
         cancelRequest, 
         checkRequest, 
         declineRequest,  
         getFriendRequests, 
         sendFriendRequest } from "../Controllers/friendRequest.js";

const router = express.Router();

router.post("/send/:id", protectRoute,sendFriendRequest);


router.get("/", protectRoute,getFriendRequests);

router.get("/check/:id",protectRoute,checkRequest);

router.post("/cancel/:id",protectRoute,cancelRequest);

router.post("/decline/:id",protectRoute,declineRequest);

router.put("/accept/:id",protectRoute,acceptFriendRequest);

export default router;