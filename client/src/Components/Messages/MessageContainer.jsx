import React, { useEffect } from 'react'
import Messages from './Messages'
import useConversation from '../../zustand/useConversation'

function MessageContainer() {
   const {selectedConversation, setSelectedConversation} = useConversation();
   
   useEffect(() => {
       return () => setSelectedConversation('New Chat')
   },[setSelectedConversation])

  return (
    <div className='w-full h-full overflow-auto'>
       {selectedConversation === 'New Chat' ? (<div className='text-center'>New chat </div>) : (<Messages/>
        )}
    </div>
  )
}

export default MessageContainer
