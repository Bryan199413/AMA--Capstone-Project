import { useEffect, useState } from "react";
import { toast } from 'sonner'
import useFriend from "../zustand/useFriend";

const useGetFriends = () => {
    const [loadingF,setLoading] = useState(false);
    const {friends,setFriends} = useFriend();

    useEffect(() => {
        const getFriends = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/friends');
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                setFriends(data);
            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
        }
    
         getFriends();
      },[]);
    
      return {loadingF, friends};
}

export default useGetFriends;
