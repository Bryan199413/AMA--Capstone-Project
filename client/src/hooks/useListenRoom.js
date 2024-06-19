import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useMatching from "../zustand/useMatching";
import { useAuthContext } from "../context/AuthContext";

const useListenRoom = () => {
  const {authUser} = useAuthContext();
  const { socket } = useSocketContext();
  const { room, setRoom, deleteRoomMessages, setReceiverProfile} = useMatching();
  
  useEffect(() => {
    const handleUpdatedRoom = (updatedRoom) => {
      if (updatedRoom?.status === "chatEnded") {
        setRoom(updatedRoom);
      } else if (updatedRoom === null) {
        setRoom(null);
      }
      else if (updatedRoom && updatedRoom.id === room?.id) {
        setRoom(updatedRoom);
      }
    };

    const hadleDataForJoinedUser = (dataForJoinedUser) => {
       setReceiverProfile(dataForJoinedUser);
    }
    const hadleDataForRoomCreator = (dataForRoomCreator) => {
       setReceiverProfile(dataForRoomCreator);
    }

    const handleBlockedUsers = (blockedUser) => {
       if(room) {
        const isAuthUserInParticipants = room?.participants?.includes(authUser._id);
        const isBlockedUserInParticipants = room?.participants?.includes(blockedUser.userId);

        if(isAuthUserInParticipants && isBlockedUserInParticipants) {
            setRoom(null);
        }
       }
    }

    socket?.on("updatedRoom", handleUpdatedRoom);
    socket?.on("dataForJoinedUser",hadleDataForJoinedUser);
    socket?.on("dataForRoomCreator",hadleDataForRoomCreator);
    socket?.on("blockedUser",handleBlockedUsers);

    return () => {
      socket?.off("updatedRoom", handleUpdatedRoom);
      socket?.off("dataForJoinedUser",hadleDataForJoinedUser);
      socket?.off("dataForRoomCreator",hadleDataForRoomCreator);
      socket?.off("blockedUser",handleBlockedUsers);
    };
  }, [socket, room, setRoom, deleteRoomMessages,authUser]);
};

export default useListenRoom;