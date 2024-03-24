import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../hooks/useGetMessage'
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {
  const {messages,loading} = useGetMessage()
  useListenMessages();
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

      {loading && (<div className='text-center'>loading...</div>)}
      {!loading && messages.length === 0 && (<p className='text-center'>Send a message to start the conversation</p>)}
    </div>     
  ) 
}

export default Messages
