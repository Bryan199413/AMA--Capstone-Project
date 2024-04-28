import { useEffect} from 'react';
import { useSocketContext } from '../context/SocketContext'
import useFriend from '../zustand/useFriend';
import { useAuthContext } from '../context/AuthContext';

const useListenFriendRequest = () => {
  const { socket } = useSocketContext();
  const {authUser} = useAuthContext();
  const {friendRequests,setFriendRequests} = useFriend();
 
  useEffect(() => {
    socket?.on("newFriendRequest", (newFriendRequest) => {
      if (newFriendRequest.receiverId === authUser._id) {
        setFriendRequests([...friendRequests, newFriendRequest]);
      } 
    });    

    return () => socket?.off("newFriendRequest");
  }, [socket, setFriendRequests, friendRequests]);
}

export default useListenFriendRequest;
       
        
      
  

      