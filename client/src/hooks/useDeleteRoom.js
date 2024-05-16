import { useState } from "react";
import useMatching from "../zustand/useMatching"
import { toast } from 'sonner'

const useDeleteRoom = () => {
    const {room,setRoom} = useMatching();
    const [loadingD,setLoading] = useState(false);
   
    const deleteRoom = async () => {
        setLoading(true);
        try {
           const res = await fetch(`api/rooms/deleteRoom/${room._id}`,{
               method:"POST",
               headers:{"Content-Type" : "application/json"},
           })
          const deletedRoom = await res.json();
        //   setRoom(deletedRoom);
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
   
    return {deleteRoom,loadingD};
}

export default useDeleteRoom;
