import { useAuthContext } from '../context/AuthContext';
import { toast } from 'sonner'
import useMatching from '../zustand/useMatching';

const useLogout = () => {
 const {setAuthUser} = useAuthContext()
 const {setRoom,deleteRoomMessages} = useMatching()

 const logout = async () => {
  try {
    const res = await fetch("/api/users/logout",{
        method:"POST",
        headers:{"Content-Type" : "application/json"}
    })

    const data = await res.json()

    if(data.error){
        throw new Error(data.Error);
    }
    localStorage.removeItem("machimachi-user")
    setAuthUser(null);
    setRoom(null);
    deleteRoomMessages();
  } catch (error) {
     toast.error(error.message)  
  }
 }
 return {logout};
};

export default useLogout
