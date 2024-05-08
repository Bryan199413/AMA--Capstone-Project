import FriendRequest from "../Models/FriendRequest.js";
import Friend from "../Models/Friend.js"
import User from "../Models/User.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendFriendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const existingRequest = await FriendRequest.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });
       
        const existingFriend = await Friend.findOne({
            userId: senderId,
            friends: receiverId,
        });

        if(existingRequest || existingFriend) {
            return res.status(400).json({ error: "Friend request already sent or already friends." });
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
        const friendRequest = await FriendRequest.findById(friendRequestId);
        const receiverId = friendRequest.receiverId;

        await FriendRequest.findByIdAndDelete(friendRequestId);
       
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("friendRequestCancelled", friendRequestId);
        }
       
        res.status(200).json("Friend request successfully canceled")
    } catch (error) {
        console.log("Error in cancelRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
        
export const declineRequest = async (req,res) => {
    try {
        const { id:friendRequestId} = req.params;
        const existingRequest = await FriendRequest.findByIdAndDelete(friendRequestId);
        res.status(200).json(existingRequest)

    } catch (error) {
        console.log("Error in declineRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const friendRequestId = req.params.id;
        const newStatus = "accepted"; 

        const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(
            friendRequestId,
            { status: newStatus },
            { new: true }
        );

        if (updatedFriendRequest.status === "accepted") {
            await Promise.all([
                Friend.findOneAndUpdate(
                    { userId: updatedFriendRequest.senderId },
                    { $push: { friends: updatedFriendRequest.receiverId } },
                    { new: true, upsert: true }
                ),
                Friend.findOneAndUpdate(
                    { userId: updatedFriendRequest.receiverId },
                    { $push: { friends: updatedFriendRequest.senderId } },
                    { new: true, upsert: true }
                )
            ]);

            await FriendRequest.findByIdAndDelete(friendRequestId);
            const data = await User.findById(updatedFriendRequest.senderId);
            
            const newFriend = {
                _id: data._id,
                avatar: data.avatar,
                username: data.username,
            }
            const acceptantUser = await User.findById(updatedFriendRequest.receiverId);
            const acceptantData = {
                _id:acceptantUser._id,
                avatar:acceptantUser.avatar,
                username:acceptantUser.username,
                receiverId:data._id,
            }

            const receiverSocketId = getReceiverSocketId(data._id);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newFriend", acceptantData);
            }

            return res.status(200).json(newFriend);
        } else {
            return res.status(400).json({ error: "Friend request status could not be updated" });
        }
    } catch (error) {
        console.log("Error in acceptFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}