import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import useConversation from "../zustand/useConversation";
import useDeleteRoom from "../hooks/useDeleteRoom";
import useMatching from "../zustand/useMatching";

function MatchingButton() {
  const {selectedConversation} = useConversation()
  const {room} = useMatching();
  const {fetchRoom,loading} = useRoom();
  const {deleteRoom} = useDeleteRoom();
  const [btnColor,setBtnColor] = useState("")
  console.log(room)

  useEffect(() => {
    if (!room) {
      setBtnColor("bg-blue-700 hover:bg-blue-600");
    } else if (room.status === "waiting") {
      setBtnColor("bg-gray-500 hover:bg-gray-400"); 
    } else if (room.status === "chatting") {
      setBtnColor("bg-red-700 hover:bg-red-600");
    }
  }, [room]);
  
  const handleStart = () => {
      fetchRoom();
  };

  return (
    <div className={`${selectedConversation === "New Chat" ? '' : 'hidden'}`} >
        {!room && (<div className={`btn ${btnColor} text-white border-none`} onClick={loading ? null : handleStart}>Start</div>)}
        {room?.status === "waiting"  && (<div className={`btn ${btnColor} text-white border-none`} onClick={deleteRoom}>Stop</div>)}
        {room?.status === "chatting"  && (<div className={`btn ${btnColor} text-white border-none`} onClick={deleteRoom}>End</div>)}
    </div>
  )
}

export default MatchingButton
