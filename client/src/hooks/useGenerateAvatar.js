import { useState } from 'react';
import { toast } from 'sonner'

const useGenerateAvatar = () => {
    const [loading,setLoading] = useState(false);
    const [newAvatar,setNewAvatar] = useState();
    
    const generateAvatar = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/generateAvatar/');
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            setNewAvatar(data)
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
    
return {loading,generateAvatar,newAvatar}
}

export default useGenerateAvatar
