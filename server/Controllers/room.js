import Room from '../Models/Room.js';
import { getParticipantSocketId ,getReceiverSocketId , io } from '../socket/socket.js';
import BlockedUser from '../Models/BlockedUser.js';
import User from '../Models/User.js'

export const createRoom = async (req, res) => {
    const method = req.method.toUpperCase();
    const { id: participant } = req.params;
    switch (method) {
        case "GET":
            try {
                const rooms = await Room.aggregate([
                    { $match: { status: "waiting" } },
                    { $sample: { size: 1 } }
                ]);
                
                if (rooms.length > 0 ) {
                    const roomId = rooms[0]._id.toString(); 
                    const room = await Room.findById(roomId);

                    if (room.participants.includes(participant)) {
                        return res.status(400).json({ error: "User already exists in the room." });
                    }
                    const blockedByCreator = await BlockedUser.exists({
                        userId: room.participants[0],
                        blockedUsers: { $in: [participant] }
                    });
                    const blockedByJoining = await BlockedUser.exists({
                        userId: participant,
                        blockedUsers: { $in: [room.participants[0]] }
                    });
                    
                    if (blockedByCreator || blockedByJoining) {
                        await Room.findByIdAndUpdate(roomId, {
                            $pull: { participants: participant }
                        });
                        return  res.json("Blocked")
                    }

                    await Room.findByIdAndUpdate(roomId, {
                        status: "chatting",
                        $addToSet: { participants: participant }
                    });
                    const data = await Room.findById(roomId);
                    const joinedUserId = participant; 
                    const roomCreatorId = data.participants.find(participant => participant !== joinedUserId);
                    
                    const joinedUser= await User.findById(joinedUserId);
			        const roomCreator = await User.findById(roomCreatorId);

                    const dataForJoinedUser = {
                        _id:roomCreator._id,
                        avatar:roomCreator.avatar,
                        username:roomCreator.username
                    }
        
                    const dataForRoomCreator = {
                        _id:joinedUserId,
                        avatar:joinedUser.avatar,
                        username:joinedUser.username
                    }

                    const joinedSocketId = getReceiverSocketId(joinedUserId);
                    const creatorSocketId = getReceiverSocketId(roomCreatorId);
                    if (joinedSocketId) {
                        io.to(joinedSocketId).emit("dataForJoinedUser",dataForJoinedUser);
                    }
                    if(creatorSocketId) {
                        io.to(creatorSocketId).emit("dataForRoomCreator",dataForRoomCreator);
                    }

                        }
                res.status(200).json(rooms);
            } catch (error) {
                console.error("Error in createRoom:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            break;
        case "POST":
            try {
                const existingRoom = await Room.findOne({ participants: participant });
                if (existingRoom) {
                    return res.status(400).json({ error: "User already exists in the room." });
                }

                const room = await Room.create({
                    status: "waiting",
                    participants: [participant]
                });
               
                const updatedRoom = await Room.findById(room._id);
                for (const participantId of updatedRoom.participants) {
                    const roomSocketId = getParticipantSocketId(participantId);
                    if (roomSocketId) {
                        io.to(roomSocketId).emit("updatedRoom", updatedRoom);
                    }
                }
                res.status(200).json(room);
            } catch (error) {
                console.error("Error in createRoom:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            break;
        default:
            res.status(400).json("No method for this endpoint");
            break;
    }
};


export const setRoom = async (req,res) => {
    try {
        const { id: roomId } = req.params
        const updatedRoom = await Room.findById(roomId)
        
        for (const participantId of updatedRoom.participants) {
            const roomSocketId = getParticipantSocketId(participantId);
            if (roomSocketId) {
                io.to(roomSocketId).emit("updatedRoom", updatedRoom);
            }
        }
        res.status(200).json(updatedRoom)
    } catch (error) {
        console.error("Error in setRoom:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteRoom = async (req, res) => {
    const { id: roomId}  = req.params;
    try {
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            return res.status(404).json({ error: "Room not found" });
        }
        const updatedRoom = null;
        for (const participantId of deletedRoom.participants) {
            const roomSocketId = getParticipantSocketId(participantId);
              
            if (roomSocketId) {
                io.to(roomSocketId).emit("updatedRoom",updatedRoom);
            }
        }
        res.status(200).json({ message :"This Room was Deleted",status:null});
    } catch (error) {
        console.log("Error in deleteRoom", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const roomMessages = async (req,res) => {
    const { message,receiverId,senderId } = req.body; 
    const { id: roomId } = req.params;
    try {
        const user = await User.findById(senderId)
        const room = await Room.findById(roomId);
        const newMessage = {
            roomId:roomId,
            senderId:senderId,
            receiverId:receiverId,
            avatar:user.avatar,
            message:message,
        }
        for (const participantId of room.participants) {
            const roomSocketId = getParticipantSocketId(participantId);
            if (roomSocketId) {
                io.to(roomSocketId).emit("newMessageInRoom", newMessage);
            }
        }
        res.status(200).json({message:"Message sent!"})
    } catch (error) {
        console.log("Error in roomMessages", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
