import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

function Conversations({ conversation,setSideNav}) {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSeleted = selectedConversation?._id === conversation._id;
  
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)
  
  const handleSelect = () => {
    setSelectedConversation(conversation)
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
      <div className="mx-2"><p>{conversation.username}</p></div>
    </div>
  )
}

export default Conversations
