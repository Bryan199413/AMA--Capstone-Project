import { useState } from 'react';
import { toast } from 'sonner'

const useReportUser = () => {
    const [loading,setLoading] = useState(false);
   
    const reportUser = async (userId, reason, description) => {
        setLoading(true);
        try {
           const response = await fetch(`api/users/report/${userId}`,{
               method:"POST",
               headers:{"Content-Type" : "application/json"},
               body:JSON.stringify({ reason, description })
           })
          
           if (!response.ok) {
            throw new Error('Failed to report user');
           }

           toast.success('User successfully reported');
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
    return {loading,reportUser};
}

export default useReportUser
