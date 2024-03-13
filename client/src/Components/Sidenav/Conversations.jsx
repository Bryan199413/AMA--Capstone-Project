import React from 'react'
import useConversation from '../../zustand/useConversation'

function Conversations({ conversation }) {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSeleted = selectedConversation?._id === conversation._id;

  return (
    <div className={`flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer ${isSeleted ? 'bg-base-100' : ''}`}
     onClick={() => setSelectedConversation(conversation)}
     >
      <div className="avatar online z-0">
          <div className="w-8 rounded-full">
          <img src={conversation.avatar} alt="Avatar" />
          </div>
      </div>
      <div className="mx-2"><p>{conversation.username}</p></div>
    </div>
  )
}

export default Conversations
