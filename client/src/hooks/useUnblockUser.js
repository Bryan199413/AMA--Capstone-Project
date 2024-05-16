import { useState } from "react"
import { toast } from 'sonner'
import useBlockedUsers from "../zustand/useBlockedUsers";

const useUnBlockUser = () => {
 const [loadingUnblock,setLoading] = useState(false);
 const {blockedUsers,setBlockedUsers} =  useBlockedUsers();
 const unBlockUser = async (userId) => {
    setLoading(true);
    try {
        const res = await fetch(`api/users/unblock/${userId}`,{
            method:"DELETE",
            headers:{"Content-Type" : "application/json"},
        });
        
        if (!res.ok) {
          throw new Error('Failed to UnBlock');
        }
  
        await res.json();
        const updatedBlockedUsers = blockedUsers.filter(blockedUser => blockedUser._id !== userId);
        setBlockedUsers(updatedBlockedUsers);
    } catch (error) {
        toast.error(error.error);
    } finally {
        setLoading(false);
    }
 }

 return {loadingUnblock,unBlockUser};
}

export default useUnBlockUser;
