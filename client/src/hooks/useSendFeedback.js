import { useState } from 'react'
import { toast } from 'sonner'

const useSendFeedback = () => {
    const [loading,setLoading] = useState(false);
   
    const sendFeedback = async (feedbackText) => {
        setLoading(true);
        try {
           const response = await fetch('api/users/feedback',{
               method:"POST",
               headers:{"Content-Type" : "application/json"},
               body:JSON.stringify({feedbackText})
           })
          
           if (!response.ok) {
            throw new Error('Failed to send feedback');
           }

           toast.success('Feedback sent successfully!');
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
    return {loading,sendFeedback};
}

export default useSendFeedback;
