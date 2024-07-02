import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const useGetRegisteredUsers = () => {
  const [loading,setLoading] = useState();
  const [registeredUsers,setRegisteredUsers] = useState();
  useEffect(() => {
    const getRegisteredUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/totalUsers');
            const data = await res.json()
            if(data.error) {
                throw new Error(data.error);
            }
            setRegisteredUsers(data)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    getRegisteredUsers();
  },[])
  
  return {loading,registeredUsers};
}

export default useGetRegisteredUsers;
