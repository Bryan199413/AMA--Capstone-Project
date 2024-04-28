import FriendRequest from "../Models/FriendRequest.js";
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendFriendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const existingRequest = await FriendRequest.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if(existingRequest) {
            return res.status(400).json({ error: "Friend request already sent." });
        }

        const friendRequest = await FriendRequest.create({
            senderId: senderId,
            receiverId: receiverId
        });
        
        const request =  await FriendRequest.findById(friendRequest._id).populate("senderId");
        const newFriendRequest = {
            id: request._id,
            senderId: request.senderId._id,
            username: request.senderId.username,
            avatar: request.senderId.avatar,
            receiverId:receiverId
        }

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newFriendRequest", newFriendRequest);
		}

        res.status(201).json(friendRequest);
    } catch (error) {
        console.log("Error in sendFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getFriendRequests = async (req,res) => {
    try {
        const userId = req.user._id; 
        const friendRequests = await FriendRequest.find({ receiverId: userId, status:"pending" }).populate('senderId');
        
        const formattedFriendRequests = friendRequests.map(request => ({
            id: request._id,
            avatar: request.senderId.avatar,
            username: request.senderId.username,
            senderId: request.senderId._id,
        }));
        res.status(200).json(formattedFriendRequests);
    } catch (error) {
        console.log("Error in getFriendRequests controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const checkRequest = async (req,res) => {
    try {
        const userId = req.user._id;
        const { id: receiverId } = req.params;
        const existingRequest = await FriendRequest.findOne({
            senderId:userId,
            receiverId:receiverId,
            status:"pending"
        });
        if(!existingRequest) return res.status(200).json("No requested yet");
        return res.status(200).json(existingRequest);
    } catch (error) {
        console.log("Error in checkRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const cancelRequest = async (req,res) => {
    try {
        const friendRequestId = req.params.id;
        await FriendRequest.findByIdAndDelete(friendRequestId);
        res.status(200).json("Friend request successfully canceled")
    } catch (error) {
        console.log("Error in checkRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
        
