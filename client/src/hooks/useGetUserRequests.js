import { useEffect } from 'react';
import useFriend from '../zustand/useFriend';
import { toast } from 'sonner'

const useGetUserRequests = () => {
    const {setRequested} = useFriend();
    useEffect(() => {
      const getUserRequests = async () => {
        
          try {
              const res = await fetch('/api/friendRequests/getUserRequests');
              const data = await res.json();
  
              if(data.error) {
                  throw new Error(data.error);
              }
              setRequested(data);
          } catch (error) {
              toast.error(error.message);
          } 
      }
       getUserRequests();
    },[])

}

export default useGetUserRequests;
