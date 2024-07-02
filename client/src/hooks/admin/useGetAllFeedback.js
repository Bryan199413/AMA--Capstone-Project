import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function useGetAllFeedback() {
    const [loading,setLoading] = useState();
    const [feedback,setFeedback] = useState();
    useEffect(() => {
      const getAllFeedback = async () => {
          setLoading(true);
          try {
              const res = await fetch('/api/users/allFeedback');
              const data = await res.json()
              if(data.error) {
                  throw new Error(data.error);
              }
              setFeedback(data)
          } catch (error) {
              toast.error(error.message);
          } finally {
              setLoading(false);
          }
      }
      getAllFeedback();
    },[])
    
    return {loading,feedback};
}

export default useGetAllFeedback;
