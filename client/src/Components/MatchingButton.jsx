import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import useConversation from "../zustand/useConversation";
import useDeleteRoom from "../hooks/useDeleteRoom";
import useMatching from "../zustand/useMatching";

function MatchingButton() {
  const {selectedConversation} = useConversation()
  const {room} = useMatching();
  const {fetchRoom,loading} = useRoom();
  const {deleteRoom,loadingD} = useDeleteRoom();
  const [btnColor,setBtnColor] = useState("")
  
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
        {!room && (<button type="button" className={`btn ${btnColor} px-0 w-16 text-white border-none`} onClick={loading ? null : handleStart}>Start</button>)}
        {room?.status === "waiting"  && (<button type="button" className={`btn ${btnColor} px-0 w-16 text-white border-none`} onClick={loadingD ? null : deleteRoom}>Stop</button>)}
        {room?.status === "chatting"  && (<button type="button" className={`btn ${btnColor} px-0 w-16 text-white border-none`} onClick={loadingD ? null : deleteRoom}>End</button>)}
    </div>
  )
}

export default MatchingButton
