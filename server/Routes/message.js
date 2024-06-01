import express from "express";
import { sendMessage,getMessages, deleteConversation } from "../Controllers/message.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/delete/:id",protectRoute,deleteConversation);


export default router;