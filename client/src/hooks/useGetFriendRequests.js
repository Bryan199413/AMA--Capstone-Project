import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useFriend from '../zustand/useFriend';

const useGetFriendRequests = () => {
  const [loading,setLoading] = useState();
  const {friendRequest,setFriendRequests} = useFriend();
  
  useEffect(() => {
    const getFriendRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/friendRequests');
            const data = await res.json()

            if(data.error) {
                throw new Error(data.error);
            }
            setFriendRequests(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    getFriendRequests();
  },[friendRequest,setFriendRequests])
  
  return {loading};
}

export default useGetFriendRequests;
