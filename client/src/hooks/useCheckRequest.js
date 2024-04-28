import { useEffect} from "react"
import useMatching from "../zustand/useMatching"
import { toast } from 'sonner'
import { useAuthContext } from "../context/AuthContext"
import useFriend from "../zustand/useFriend"

const useCheckRequest = () => {
  const {authUser} = useAuthContext();
  const {requested,setRequested} = useFriend();
  const {room} = useMatching();
  const participantsArray = room?.participants.filter(participant => participant !== authUser._id);
  const receiverId = participantsArray ? participantsArray[0] : null;

  useEffect(() => {
    const checkRequest = async () => {
        try {
            const res = await fetch(`/api/friendRequests/check/${receiverId}`);
            const data = await res.json();
            setRequested(data);
        } catch (error) {
            toast.error(error.message);
        } 
    }
    if (room.status === "chatting") {
        checkRequest();
      }
  },[room,requested])

}

export default useCheckRequest;
