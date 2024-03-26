import React, { useEffect } from 'react'
import Messages from './Messages'
import useConversation from '../../zustand/useConversation'

function MessageContainer() {
   const {selectedConversation, setSelectedConversation} = useConversation();
   
   useEffect(() => {
       return () => setSelectedConversation(selectedConversation)
   },[setSelectedConversation])

  return (
    <div className='messageContainer w-full h-full overflow-auto z-10'>
       {selectedConversation === 'New Chat' ? (<div className='text-center'>New chat </div>) : (<Messages/> )}   
    </div>
  )
}

export default MessageContainer
