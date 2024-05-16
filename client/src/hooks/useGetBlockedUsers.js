import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useBlockedUsers from '../zustand/useBlockedUsers';

const useGetBlockedUsers = () => {
  const [loading,setLoading] = useState();
  const {blockedUsers,setBlockedUsers} = useBlockedUsers();
  useEffect(() => {
    const getBlockedUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/blockedUsers');
            const data = await res.json()
            if(data.error) {
                throw new Error(data.error);
            }
            setBlockedUsers(data)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    getBlockedUsers();
  },[])
  
  return {loading,blockedUsers};
}

export default useGetBlockedUsers;
