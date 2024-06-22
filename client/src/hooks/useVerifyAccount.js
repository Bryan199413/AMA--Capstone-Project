import { useState } from 'react'
import { toast } from 'sonner'
import parsePhoneNumber from 'libphonenumber-js'

const useVerifyAccount = () => {
    const [loading,setLoading] = useState(false);
    const verify = async ({username,phoneNumber}) => {
    const succes = handleInputErrors({username,phoneNumber});
    
    if(!succes) return;

    setLoading(true);
    try {
        const res = await fetch('/api/users/verifyAccount',{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({username,phoneNumber})
        })
        
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return toast.success(data.message)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
}

  return { loading, verify};
}

export default useVerifyAccount

function handleInputErrors({username,phoneNumber}){
    
    if(!username || !phoneNumber){
        toast.warning("Please fill in all fields")
        return false;
    }

    if (username.length < 4 || username.length > 20) {
        toast.error('Invalid Username')
        return false;
    }

    const phoneNumberObj = parsePhoneNumber(phoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
          toast.error('Invalid phone number');
          return false;
    }
    
    return true;
}