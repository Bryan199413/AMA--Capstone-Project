import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useMatching from "../zustand/useMatching";

const useListenRoom = () => {
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

    socket?.on("updatedRoom", handleUpdatedRoom);
    socket?.on("dataForJoinedUser",hadleDataForJoinedUser);
    socket?.on("dataForRoomCreator",hadleDataForRoomCreator);

    return () => {
      socket?.off("updatedRoom", handleUpdatedRoom);
      socket?.off("dataForJoinedUser",hadleDataForJoinedUser);
      socket?.off("dataForRoomCreator",hadleDataForRoomCreator)
    };
  }, [socket, room, setRoom, deleteRoomMessages]);
};

export default useListenRoom;