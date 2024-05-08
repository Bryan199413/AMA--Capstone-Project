import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useFriend from "../zustand/useFriend";
import { useAuthContext } from "../context/AuthContext";

const useListenFriend = () => {
    const { socket } = useSocketContext();
    const { authUser } = useAuthContext();
    const { friends, setFriends } = useFriend();
    
    useEffect(() => {
      const handleNewFriend = (newFriend) => {
        if (newFriend.receiverId === authUser._id) {
          setFriends([...friends, newFriend]);
        }
      };
      
      const handleUnfriend = (friendId) => {
        const index = friends.findIndex(friend => friend._id === friendId);

          const updatedFriends = [...friends];
          updatedFriends.splice(index, 1);
          setFriends(updatedFriends);
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
