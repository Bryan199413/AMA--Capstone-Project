import { Server} from 'socket.io';
import http from 'http';
import express from 'express';
import Room from '../Models/Room.js';
import User from '../Models/User.js';
const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5000"],
        methods:["GET","POST"]
    }
});

export const getParticipantSocketId = (participantSocketId) => {
	return userSocketMap[participantSocketId];
};

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; 

io.on('connection', async (socket) => {
    console.log("a user connected",socket.id)

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
            userSocketMap[userId] = socket.id;
            await User.findByIdAndUpdate(userId, { isOnline: true });
        }

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        await User.findByIdAndUpdate(userId, { isOnline: false });

        try {           
            const deletedRoom = await Room.findOneAndDelete({ participants: userId });
            if(!deletedRoom) return;
            const updatedRoom = deletedRoom.participants.length > 1 ? ({status:"chatEnded", participants:deletedRoom.participants}) : null
            for (const participantId of deletedRoom.participants) {
                const roomSocketId = getParticipantSocketId(participantId);
                    
                if (roomSocketId) {
                    io.to(roomSocketId).emit("updatedRoom",updatedRoom);
                }
            }
            console.log("Room deleted:",deletedRoom._id);
        } catch (error) {
            console.error("Error deleting room:", error);
        }
          
    })
})

export {app,io,server};