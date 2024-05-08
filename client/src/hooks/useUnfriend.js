import { useState } from "react"
import { toast } from 'sonner'
import useFriend from "../zustand/useFriend";

const useUnfriend = () => {
 const [loadingUnfriend,setLoadingUnfriend] = useState(false);
 const {friends,setFriends} = useFriend();

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
