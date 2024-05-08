import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllFriends, unfriend } from "../Controllers/friend.js";

const router = express.Router();

router.get("/",protectRoute,getAllFriends);

router.delete('/:id',protectRoute,unfriend);

export default router;