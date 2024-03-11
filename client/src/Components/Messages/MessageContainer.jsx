import React from 'react'
import Messages from './Messages'

function MessageContainer() {
   const  newChatSelected = true
  return (
    <div className='w-full h-full overflow-auto'>
       {newChatSelected ? (<div className='text-center'>New chat </div>) : (<Messages/>
        )}
    </div>
  )
}

export default MessageContainer
