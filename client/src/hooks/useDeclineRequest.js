import { useState } from 'react'
import { toast } from 'sonner'
import useFriend from '../zustand/useFriend';

const useDeclineRequest = () => {
  const [loading,setLoading] = useState();
  const {friendRequests,setFriendRequests} = useFriend();

  const declineRequest = async (friendRequestId) => {
    setLoading(true);
    try {
         const res = await fetch(`api/friendRequests/decline/${friendRequestId}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
        });
        
        if (!res.ok) {
          throw new Error('Failed to decline friend request');
        }
  
        await res.json();
        const updatedRequests = friendRequests.filter(request => request.id !== friendRequestId); 
        setFriendRequests(updatedRequests);
    } catch (error) {
        toast.error(error.error);
    } finally {
        setLoading(false);
    }
  } 

  return {loading,declineRequest};
}

export default useDeclineRequest
