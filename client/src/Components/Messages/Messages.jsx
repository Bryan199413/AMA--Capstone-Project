import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../hooks/useGetMessage'

function Messages() {
  const {messages,loading} = useGetMessage()
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"});
    },0);
  },[messages]);

  return (
    <div className='max-w-[850px] mx-auto w-full'>
      {!loading && 
      messages.length > 0 &&  
      messages.map((message) => (
      <div key={message._id} ref={lastMessageRef}>
        <Message message={message}/>
      </div>))}

      {loading && (<div className='flex justify-center items-center mt-2'><span className="loading loading-spinner loading-lg"></span></div> )}
      {!loading && messages.length === 0 && (<p className='text-center'>Send a message to start the conversation</p>)}
    </div>     
  ) 
}

export default Messages
