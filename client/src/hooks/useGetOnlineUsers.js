import { useEffect, useState } from "react";
import { toast } from 'sonner'

const useGetOnlineUsers = () => {
    const [loadingOU,setLoading] = useState(false);
    const [online,setOnline] = useState(0);
  
    useEffect(() => {
        const getOnlineUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users/getOnlineUsers');
                const data = await res.json();
                
                if(data.error) {
                    throw new Error(data.error);
                }
                setOnline(data);
            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
        }
    
         getOnlineUsers();
      },[]);
    
      return {loadingOU,online};
}

export default useGetOnlineUsers
