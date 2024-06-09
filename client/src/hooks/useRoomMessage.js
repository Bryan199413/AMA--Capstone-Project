import useMatching from "../zustand/useMatching";
import { useAuthContext } from "../context/AuthContext";
import { toast } from 'sonner'
import { useState } from "react";

const useRoomMessage = () => {
  const [loadingM,setLoading] = useState(false)
  const { room } = useMatching();
  const {authUser} = useAuthContext();
  const participantsArray = room?.participants?.filter(participant => participant !== authUser._id);
  const receiverId = participantsArray ? participantsArray[0] : null;
  const senderId = authUser._id;
  
  const sendMessageRoom = async (message) => {
    setLoading(true);
    try {
        await fetch(`/api/rooms/messages/${room._id}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({message,receiverId,senderId})
      }); 

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

  return { sendMessageRoom, loadingM };
};

export default useRoomMessage;
