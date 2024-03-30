import Room from '../Models/Room.js';
import { getParticipantSocketId ,io } from '../socket/socket.js';

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

                    await Room.findByIdAndUpdate(roomId, {
                        status: "chatting",
                        $addToSet: { participants: participant }
                    });
                    
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


export const getRoom = async (req,res) => {
    try {
        const { id: roomId } = req.params
        const updatedRoom = await Room.findById(roomId)
        console.log("Rooms:", updatedRoom);
      
        for (const participantId of updatedRoom.participants) {
            const roomSocketId = getParticipantSocketId(participantId);
            if (roomSocketId) {
                io.to(roomSocketId).emit("updatedRoom", updatedRoom);
            }
        }
        res.status(200).json(updatedRoom)
    } catch (error) {
        console.error("Error in getRoom:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}