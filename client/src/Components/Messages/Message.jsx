import React from 'react'

function Message() {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
         <div className='w-10 rounded-full'>
           <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"  alt="Tailwind CSS chat bubble component" />
         </div>
      </div>
    <div>
        <div className="chat-bubble">I hate you!</div>
        <time className="text-xs opacity-50">12:46</time>   
    </div>
    </div>
  )
}

export default Message
