import { useState } from "react"
import { toast } from 'sonner'
import useFriend from "../zustand/useFriend";

function useAcceptRequest() {
  const [loadingAccept,setLoading] = useState(false);
  const {friendRequests,setFriendRequests,friends,setFriends} = useFriend();
  const acceptRequest = async (friendRequestId) => {
    setLoading(true);
    try {
        const res = await fetch(`/api/friendRequests/accept/${friendRequestId}`,{
            method:"PUT",
            headers: {
                'Content-Type' : 'application/json'
              },
        })
       
        if(res.ok) {
            const newFriend = await res.json();
            const updatedRequests = friendRequests.filter(request => request.id !== friendRequestId); 
            setFriends([...friends,newFriend])
            setFriendRequests(updatedRequests);
        }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {loadingAccept,acceptRequest};
}

export default useAcceptRequest
