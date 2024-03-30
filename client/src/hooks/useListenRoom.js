import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useMatching from "../zustand/useMatching";

const useListenRoom = () => {
  const { socket } = useSocketContext();
  const { room, setRoom } = useMatching();

  useEffect(() => {
    socket?.on("updatedRoom", (updatedRoom) => {
        if(updatedRoom?.id === room?.id) {
          if (updatedRoom.participants.length === 2) {
            setRoom(updatedRoom);
          }
      }
    });
    return () => socket?.off("updatedRoom");
  }, [socket,room,setRoom]);
};

export default useListenRoom;
