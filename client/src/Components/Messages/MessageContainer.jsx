import React, { useEffect } from 'react'
import Messages from './Messages'
import useConversation from '../../zustand/useConversation'
import NewChat from '../NewChat';

function MessageContainer() {
   const {selectedConversation, setSelectedConversation} = useConversation();

   useEffect(() => {
       return () => setSelectedConversation(selectedConversation)
   },[setSelectedConversation])

  return (
    <div className='messageContainer w-full h-full overflow-auto z-10'>
       {selectedConversation === 'New Chat' ? (<NewChat />) : (<Messages/> )}   
    </div>
  )
}

export default MessageContainer
