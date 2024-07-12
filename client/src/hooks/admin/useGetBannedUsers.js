import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useBannedUsers from '../../zustand/useBannedUsers';

const useGetBannedUsers = () => {
    const [loading,setLoading] = useState();
    const {bannedUsers,setBannedUsers} = useBannedUsers();
    useEffect(() => {
      const getBannedUsers = async () => {
          setLoading(true);
          try {
              const res = await fetch('/api/users/banned/users');
              const data = await res.json();
              if(data.error) {
                  throw new Error(data.error);
              }
              setBannedUsers(data);
          } catch (error) {
              toast.error(error.message);
          } finally {
              setLoading(false);
          }
      }
      getBannedUsers();
    },[])
    
    return {loading,bannedUsers};
}

export default useGetBannedUsers
