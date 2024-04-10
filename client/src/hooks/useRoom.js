import { useState } from "react";
import { toast } from 'sonner'
import useMatching from '../zustand/useMatching'
import { useAuthContext } from '../context/AuthContext';

const createRoom = async (userId) => {
  try {
    const res = await fetch(`/api/rooms/${userId}`, {
      method: "POST",
    });
    const roomData = await res.json();
    return roomData;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Failed to create room");
  }
};

const useRoom = () => {
  const{ authUser } = useAuthContext()
  const [loading, setLoading] = useState(false);
  const {room,setRoom} = useMatching()
  const fetchRoom = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/rooms/${authUser._id}`);
      const rooms = await res.json();
    
      if (rooms.length > 0) {
        const getRoom = await fetch(`/api/rooms/setroom/${rooms[0]._id}`);
        const room = await getRoom.json()
        setRoom(room);
       
      } else {
        const newRoom = await createRoom(authUser._id);
        setRoom(newRoom);
      }
    } catch (error) {
      toast.error(error.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading,fetchRoom,room };
};

export default useRoom;

