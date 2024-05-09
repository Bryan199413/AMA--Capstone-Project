import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useFriend from "../zustand/useFriend";
import { useAuthContext } from "../context/AuthContext";

const useListenFriend = () => {
    const { socket } = useSocketContext();
    const { authUser } = useAuthContext();
    const { friends, setFriends,requested,setRequested } = useFriend();
    
    useEffect(() => {
      const handleNewFriend = (newFriend) => {
        if (newFriend.receiverId === authUser._id) {
          setFriends([...friends, newFriend]);
        }
      };
      
      const handleUnfriend = (friendId) => {
        const indexFriends = friends.findIndex(friend => friend._id === friendId);
        const indexRequested = requested.findIndex(requested => requested._id === friendId);
        const updatedRequested = [...requested];
        const updatedFriends = [...friends];
        updatedRequested.splice(indexRequested, 1);
        updatedFriends.splice(indexFriends, 1);
        setFriends(updatedFriends);
        setRequested(updatedRequested);
        }
     

      socket?.on("newFriend", handleNewFriend);
      socket?.on("unfriend", handleUnfriend);

      return () => {
        socket?.off("newFriend", handleNewFriend);
        socket?.off("unfriend", handleUnfriend);
      };
    }, [socket,friends, setFriends]);
}

export default useListenFriend;
