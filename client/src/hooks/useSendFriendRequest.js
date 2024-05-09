import { useState } from 'react'
import useMatching from '../zustand/useMatching';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'sonner'
import useFriend from '../zustand/useFriend';

const useSendFriendRequest = () => {
  const [loading,setLoading] = useState(false);
  const { room } = useMatching();
  const {authUser} = useAuthContext();
  const {requested,setRequested} = useFriend();
  const participantsArray = room?.participants.filter(participant => participant !== authUser._id);
  const receiverId = participantsArray ? participantsArray[0] : null;

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
        const res =  await fetch(`/api/friendRequests/send/${receiverId}`,{
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
              },
        })
        const newRequested = await res.json();
      setRequested([...requested,newRequested]);
    } catch (error) {
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return {sendFriendRequest,loading}
};

export default useSendFriendRequest
