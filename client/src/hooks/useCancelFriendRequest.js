import { useState } from "react"
import useFriend from "../zustand/useFriend";
import { toast } from 'sonner'

const useCancelFriendRequest = () => {
  const [loadingCFR,setLoading] = useState(false);
  const {requested,setRequested} = useFriend();
  const cancelFriendRequest = async () => {
    setLoading(true);
    try {
        await fetch(`api/friendRequests/cancel/${requested._id}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
        });
        setRequested("No requested yet");
    } catch (error) {
        toast.error(error.error);
    } finally {
        setLoading(false);
    }
  }

  return {cancelFriendRequest , loadingCFR};
}

export default useCancelFriendRequest
