import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function useGetReportedUsers() {
    const [loading,setLoading] = useState();
    const [reportedUsers,setReportedUsers] = useState();
    useEffect(() => {
      const getAllReportedUsers = async () => {
          setLoading(true);
          try {
              const res = await fetch('/api/users/reported/users');
              const data = await res.json()
              if(data.error) {
                  throw new Error(data.error);
              }
              setReportedUsers(data);
          } catch (error) {
              toast.error(error.message);
          } finally {
              setLoading(false);
          }
      }
      getAllReportedUsers();
    },[])
    
    return {loading,reportedUsers};
}

export default useGetReportedUsers;
