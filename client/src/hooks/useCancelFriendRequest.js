import { useState } from "react"
import useFriend from "../zustand/useFriend";
import { toast } from 'sonner'

const useCancelFriendRequest = () => {
  const [loadingCFR,setLoading] = useState(false);
  const {requested,setRequested} = useFriend();
  const cancelFriendRequest = async (friendId) => {
    setLoading(true);
    try {
        await fetch(`api/friendRequests/cancel/${friendId}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
        });
        const updatedRequested = requested.filter(requested => requested._id !== friendId); 
        setRequested(updatedRequested);
    } catch (error) {
        toast.error(error.error);
    } finally {
        setLoading(false);
    }
  }

  return {cancelFriendRequest , loadingCFR};
}

export default useCancelFriendRequest
