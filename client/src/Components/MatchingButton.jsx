import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import useConversation from "../zustand/useConversation";

function MatchingButton() {
    const {selectedConversation} = useConversation()
    const {fetchRoom,room,loading} = useRoom();
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
    
    const handleStart = async () => {
        await fetchRoom();
      };
  return (
  <div className={`btn ${selectedConversation === "New Chat" ? '' : 'hidden'} ${btnColor} text-white border-none`} >
        {room === null && (<div onClick={handleStart}>Start</div>)}
        {room?.status === "waiting"  && (<div>Stop</div>)}
        {room?.status === "chatting"  && (<div>End</div>)}
  </div>
  )
}

export default MatchingButton
