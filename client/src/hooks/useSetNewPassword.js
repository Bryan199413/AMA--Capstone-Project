import { useState } from "react";
import { toast } from 'sonner'

const useSetNewPassword = () => {
    const [loading,setLoading] = useState(false);
    const setNewPassword = async ({newPassword,confirmPassword,phoneNumber}) => {
    const succes = handleInputErrors({newPassword,confirmPassword,phoneNumber});
    
    if(!succes) return;

    setLoading(true);
    
    try {
        const res = await fetch('/api/users/setNewPassword',{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({newPassword,confirmPassword,phoneNumber})
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

  return { loading, setNewPassword};
}

export default useSetNewPassword;

function handleInputErrors({newPassword,confirmPassword,phoneNumber}){
    
    if(!newPassword || !confirmPassword || !phoneNumber){
        toast.warning("Please fill in all fields")
        return false;
    }

    if(newPassword !== confirmPassword) {
        toast.error("Password do not match")
        return false;
    }

    if(newPassword.length < 8){
        toast.error('Password must be at least 8 characters')
        return false;
    }
    
    const passwordSpecialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/;
 
    if (passwordSpecialCharsRegex.test(newPassword)) {
        toast.error('Password must not contain special characters or spaces');
        return false;
    } 
     
    return true;
}
