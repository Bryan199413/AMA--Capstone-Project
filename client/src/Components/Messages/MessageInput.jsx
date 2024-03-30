import React, { useEffect, useRef, useState } from 'react'
import { TbPhotoAi } from "react-icons/tb";
import { BiSend } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";
import useSendMessage from '../../hooks/useSendMessage';
import useConversation from '../../zustand/useConversation';
import MatchingButton from '../MatchingButton';

function MessageInput() {
  const { selectedConversation } = useConversation();
  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !message.trim()) return;
    sendMessage(message);
    setMessage("");
  }

  return (
    <form className='mx-1 py-2' onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 max-w-[850px] mx-auto px-1">
          <MatchingButton/>
          <div><TbPhotoAi size={30} /></div> 
          <input  
          type="text" 
          className="grow border px-4 py-2 rounded-full border-none bg-base-300 outline-none"
          placeholder="Type a message..."
          ref={inputRef}
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          />
          <div><MdInsertEmoticon size={30} /></div>
          {loading ? <div className='loading loading-spinner'></div> : <button type='submit'><BiSend size={35} className='text-blue-700' /></button>}
        </div>
    </form>  
              
  )
}

export default MessageInput
