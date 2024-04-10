import React from 'react'
import { useAuthContext } from '../context/AuthContext';

function RoomMessage({roomMessage}) {
    const {authUser} = useAuthContext()
    const fromMe = roomMessage.senderId === authUser._id;
    const currentTime = new Date(); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const avatar = fromMe ? authUser.avatar : roomMessage.avatar;
    const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' :'';
  return (
    <div className={`chat ${chatClassName} mx-2`}>
        <div className="chat-image avatar">
            <div className="w-9 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={avatar} />
            </div>
        </div>
        <div className={`chat-bubble ${bubbleBgColor} whitespace-normal break-words ...`}>{roomMessage.message}</div>
        <div className="chat-footer opacity-50">
            <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
    </div>
  )
}

export default RoomMessage
