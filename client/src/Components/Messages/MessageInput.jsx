import React, { useEffect, useRef, useState } from 'react'
import { TbPhotoAi } from "react-icons/tb";
import { BiSend } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";
import useSendMessage from '../../hooks/useSendMessage';
import useConversation from '../../zustand/useConversation';
import MatchingButton from '../MatchingButton';
import useMatching from '../../zustand/useMatching';
import useRoomMessage from '../../hooks/useRoomMessage';

function MessageInput() {
  const {room} = useMatching();
  const [disabled,setDisabled] = useState(true)
  const { selectedConversation } = useConversation();
  const [message,setMessage] = useState("");
  const {sendMessage,loading} = useSendMessage()
  const {sendMessageRoom,loadingM} = useRoomMessage();
  const inputRef = useRef(null)

  useEffect(() => {
    if (room?.status === "chatting") {
      setDisabled(false);
    } else {
      setDisabled(true);
      setMessage("");
    }
  }, [room?.status]);

  useEffect(() => {
    inputRef.current.focus();
    setMessage("")
  }, [selectedConversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !message.trim()) return;
    if(selectedConversation === "New Chat"){
      sendMessageRoom(message) 
    } else {
       sendMessage(message);
    }  
      setMessage("");
  }
 
  return (
    <form className='mx-1 py-2' onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 max-w-[850px] mx-auto px-1">
          <MatchingButton/>
          <div><TbPhotoAi size={27} /></div> 
          <input
          disabled={selectedConversation === "New Chat" && disabled}
          type="text" 
          className="grow border px-4 py-2 rounded-full border-none bg-base-300 outline-none"
          placeholder="Type a message..." 
          ref={inputRef}
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          />
          <div><MdInsertEmoticon size={27} /></div>
          <button type='submit' 
          disabled={loading || loadingM ? true : false}>
            <BiSend size={35} 
          className={`btn ${loading || loadingM ? 'text-base-300' : 'text-blue-700'} p-0 bg-transparent hover:bg-transparent border-none shadow-none `} />
          </button>
        </div>
    </form>              
  )
}

export default MessageInput
