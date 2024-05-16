import { useState } from 'react';
import { toast } from 'sonner'

const useBlockUser = () => {
    const [loading,setLoading] = useState(false);
   
    const blockUser = async (userId) => {
        setLoading(true);
        try {
           await fetch(`api/users/block/${userId}`,{
               method:"POST",
               headers:{"Content-Type" : "application/json"},
           })
          
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
    return {loading,blockUser};
}

export default useBlockUser;
