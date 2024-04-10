import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useMatching from "../zustand/useMatching";

const useListenRoom = () => {
  const { socket } = useSocketContext();
  const { room, setRoom, deleteRoomMessages } = useMatching();
  
  useEffect(() => {
    socket?.on("updatedRoom", (updatedRoom) => {
        if (updatedRoom === null) {
            setRoom(null);
            deleteRoomMessages();
        } else if (updatedRoom && updatedRoom.id === room?.id) {
            setRoom(updatedRoom);
        }
    });
    return () => socket?.off("updatedRoom");
  }, [socket, room, setRoom]);
};

export default useListenRoom;
