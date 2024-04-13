import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import useChangeAvatar from '../zustand/useChangeAvatar';
import { toast } from 'sonner'

const useNewAvatar = () => {
    const [loadingA,setLoading] = useState(false);
    const { avatar } = useChangeAvatar();
    const {authUser,setAuthUser} = useAuthContext();
    
    const updateAvatar = async () => {
        setLoading(true)
        try {
            const res = await fetch(`api/users/changeAvatar/${authUser._id}`,{
                method:"PATCH",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({avatar})
            }) 
            const data = await res.json();
            
            if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("machimachi-user", JSON.stringify(data));
			setAuthUser(data);
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }

    return {updateAvatar,loadingA}
}

export default useNewAvatar
