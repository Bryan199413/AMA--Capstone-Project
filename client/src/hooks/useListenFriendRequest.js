import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useFriend from '../zustand/useFriend';
import { useAuthContext } from '../context/AuthContext';

const useListenFriendRequest = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { friendRequests, setFriendRequests,requested, setRequested } = useFriend();

  useEffect(() => {
    const handleNewFriendRequest = (newFriendRequest) => {
      if (newFriendRequest.receiverId === authUser._id) {
        setFriendRequests([...friendRequests, newFriendRequest]);
      }
    };

    const handleFriendRequestCancelled = (cancelledRequestId) => {
      const index = friendRequests.findIndex(request => request.id === cancelledRequestId);
      
        const updatedRequests = [...friendRequests];
        updatedRequests.splice(index, 1);
        setFriendRequests(updatedRequests);
      
    };

    const handleDecline= (friendRequestId) => {
      const index = requested.findIndex(requested => requested._id === friendRequestId);
      
        const updatedRequested = [...requested];
        updatedRequested.splice(index, 1);
        setRequested(updatedRequested);
      
    };

    socket?.on("newFriendRequest", handleNewFriendRequest);
    socket?.on("friendRequestCancelled", handleFriendRequestCancelled);
    socket?.on("declineRequest", handleDecline);

    return () => {
      socket?.off("newFriendRequest", handleNewFriendRequest);
      socket?.off("friendRequestCancelled", handleFriendRequestCancelled);
      socket?.off("declineRequest", handleDecline);
    };
  }, [socket,friendRequests, setFriendRequests]);
};

export default useListenFriendRequest;
