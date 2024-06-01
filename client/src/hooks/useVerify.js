import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '../context/AuthContext';
import useNotifications from '../zustand/useNotifications';

const useVerify = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const {setTermOfUse} = useNotifications();
    const verify = async (phoneNumber,otp) => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/signup/verify',{
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body:JSON.stringify({phoneNumber,otp})
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Registered Successfully!")
            localStorage.setItem("machimachi-user",JSON.stringify(data));
            setAuthUser(data);
            setTermOfUse(true);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return { loading, verify};
}

export default useVerify;