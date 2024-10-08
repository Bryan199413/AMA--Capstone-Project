import { useState } from 'react'
import { toast } from 'sonner'
import parsePhoneNumber from 'libphonenumber-js'

const useSignUp = () => {
  const [loading,setLoading] = useState(false);
    const signup = async ({username,password,confirmPassword,phoneNumber}) => {
    const succes = handleInputErrors({username,password,confirmPassword,phoneNumber});
    
    if(!succes) return;

    setLoading(true);
    
    try {
        const res = await fetch('/api/users/signup',{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({username,password,confirmPassword,phoneNumber})
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

  return { loading, signup};
}

export default useSignUp

function handleInputErrors({username,password,confirmPassword,phoneNumber}){
    
    if(!username || !password || !confirmPassword || !phoneNumber){
        toast.warning("Please fill in all fields")
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password do not match")
        return false;
    }

    if(password.length < 8){
        toast.error('Password must be at least 8 characters')
        return false;
    }
    
    if (username.length < 4 || username.length > 20) {
        toast.error('Username must be between 4 and 20 characters')
        return false;
    }

    const usernameSpecialCharsRegex = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/? ]/;
    const passwordSpecialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/;
    if (usernameSpecialCharsRegex.test(username)) {
        toast.error('Username must not contain special characters or spaces');
        return false;
    }
    if (passwordSpecialCharsRegex.test(password)) {
        toast.error('Password must not contain special characters or spaces');
        return false;
    } 
     
    const phoneNumberObj = parsePhoneNumber(phoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
          toast.error('Invalid phone number');
          return false;
    }
    
    

    return true;
}