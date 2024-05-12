import React from 'react'
import useMatching from '../zustand/useMatching'

function NewChatHeader() {
  const {room ,receiverProfile} = useMatching();
  return (
    <>
      {!room && (<h1>New Chat</h1>)}
      {room?.status === "waiting" && (<h1>Matching...</h1>)}
      {room?.status === "chatting" && (
        <div className='flex items-center'>
        <img className="w-10 h-10 rounded-full" src={receiverProfile.avatar} alt="Avatar" />
        <span className="p-2">{receiverProfile.username}</span>        
      </div>
      )}
    </>
  )
}

export default NewChatHeader
