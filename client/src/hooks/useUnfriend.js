import { useState } from "react"
import { toast } from 'sonner'
import useFriend from "../zustand/useFriend";
import { useAuthContext } from "../context/AuthContext";

const useUnfriend = () => {
 const {authUser} =  useAuthContext();
 const [loadingUnfriend,setLoadingUnfriend] = useState(false);
 const {friends,setFriends,requested,setRequested} = useFriend();

 const unfriend = async (friendId) => {
    setLoadingUnfriend(true);
    try {
        const res = await fetch(`api/friends/${friendId}`,{
            method:"DELETE",
            headers:{"Content-Type" : "application/json"},
        });
        
        if (!res.ok) {
          throw new Error('Failed to Unfriend');
        }
  
        await res.json();
        const updatedFriends = friends.filter(friend => friend._id !== friendId); 
        const updatedRequested = requested.filter(requested => requested.senderId === authUser.id);
        setRequested(updatedRequested);
        setFriends(updatedFriends);
    } catch (error) {
        toast.error(error.error);
    } finally {
        setLoadingUnfriend(false);
    }
 }

 return {loadingUnfriend,unfriend};
}

export default useUnfriend
