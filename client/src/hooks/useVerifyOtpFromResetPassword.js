import { useState } from "react";
import { toast } from 'sonner'

const useVerifyOtpFromResetPassword = () => {
    const [loading,setLoading] = useState(false);

    const verify = async (phoneNumber,otp) => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/verifyOtpFromResetPassword',{
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body:JSON.stringify({phoneNumber,otp})
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return { loading, verify};
}

export default useVerifyOtpFromResetPassword
