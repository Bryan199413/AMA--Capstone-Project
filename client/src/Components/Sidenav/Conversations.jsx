import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

function Conversations({ conversation,setSideNav}) {
  const {selectedConversation, setSelectedConversation,messages} = useConversation();
  const isSeleted = selectedConversation?._id === conversation._id;
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { onlineUsers, socket} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)
  
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === conversation._id) {
         if(isSeleted){
           setHasNewMessage(false)
         } else{
          setHasNewMessage(true);
         }       
      }
    };  
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket,conversation.id,messages,selectedConversation]);

  const handleSelect = () => {
    setSelectedConversation(conversation)
    setHasNewMessage(false);
    if (setSideNav) {
      setSideNav(false);
    }
  }
  return (
    <div className={`flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer ${isSeleted ? 'bg-base-100' : ''}`}
     onClick={handleSelect}
     >
      <div className={`avatar ${isOnline ? 'online' : ''} z-0`} >
        <div className="w-10 rounded-full">
          <img src={conversation.avatar} alt="Avatar" />
        </div>
      </div>
      <div className={`mx-2 ${hasNewMessage ? 'text-blue-600 font-black' : ''}`}><p>{conversation.username}</p></div>
    </div>
  )
}

export default Conversations
