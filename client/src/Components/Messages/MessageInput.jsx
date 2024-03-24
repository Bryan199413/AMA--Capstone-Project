import React, { useState } from 'react'
import { TbPhotoAi } from "react-icons/tb";
import { BiSend } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {
  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !message.trim()) return;
    sendMessage(message);
    setMessage("");
  }
   
  return (
    <form className='mx-1 py-2' onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 max-w-[850px] mx-auto">
        <TbPhotoAi size={30}/>
        <input 
         type="text" 
         className="grow" 
         placeholder="Send a message"
         value={message}
         onChange={(e) => setMessage(e.target.value)}
        />
         <button><MdInsertEmoticon size={30} /></button>
         <button type='submit' className='flex'>
          {loading ? <div className='loading loading-spinner'></div> : <BiSend size={30} className='text-blue-700' />}
         </button>
        </label>
    </form>  
  )
}

export default MessageInput
