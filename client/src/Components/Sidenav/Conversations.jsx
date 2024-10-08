import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
import useNotifications from '../../zustand/useNotifications';
import DeleteConversationModal from '../DeleteConversationModal';

function Conversations({ conversation,setSideNav}) {
  const {selectedConversation, setSelectedConversation,messages} = useConversation();
  const {sounds,popUp} = useNotifications();
  const isSelected = selectedConversation?._id === conversation._id;
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { onlineUsers, socket} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)
  
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === conversation._id) {
          setHasNewMessage(true);             
      }
    };  
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket,conversation.id,messages,selectedConversation,sounds,popUp]);

  useEffect(()=> {
   if(isSelected) {
    setHasNewMessage(false);
   }
  },[isSelected,messages]);

  const handleSelect = () => {
    setSelectedConversation(conversation)
    setHasNewMessage(false);
    if (setSideNav) {
      setSideNav(false);
    }
  }
  return (
    <div className={`flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer ${isSelected ? 'bg-base-100' : ''} group`}>
      <div className='flex items-center w-full'  onClick={handleSelect}>
        <div className={`avatar ${isOnline ? 'online' : ''} z-0`} >
          <div className="w-10 rounded-full">
            <img src={conversation.avatar} alt="Avatar" />
          </div>
        </div>
        <div className={`mx-2 ${hasNewMessage ? 'text-blue-600 font-black' : ''}`}><p>{conversation.username}</p></div>
      </div>
       <DeleteConversationModal isSelected={isSelected} conversationId={conversation._id} />
    </div>
  )
}

export default Conversations
