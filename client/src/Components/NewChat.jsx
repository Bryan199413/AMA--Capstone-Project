import React, { useEffect, useRef } from 'react';
import useMatching from '../zustand/useMatching';
import notificationSound from '../assets/sounds/notification.mp3'
import sentSound from '../assets/sounds/sentSound.wav'
import { useSocketContext } from '../context/SocketContext';
import RoomMessage from './RoomMessage';
import { useAuthContext } from '../context/AuthContext';

function NewChat() {
  const { room, roomMessages,setRoomMessages } = useMatching();
  const { authUser} = useAuthContext();
  const { socket } = useSocketContext();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"});
    },0);
  },[roomMessages]);
  
  useEffect(() => {
      socket?.on("newMessageInRoom", (newMessage) => {
        const recieverSound = new Audio(notificationSound);
        const senderSound = new Audio(sentSound)
        if(room && newMessage.roomId === room._id) {
          setRoomMessages(newMessage);
          if(newMessage.senderId === authUser._id){
            senderSound.play();
          } else {
            recieverSound.play();
          }
        } 
      });    
      return () => socket?.off("newMessageInRoom");
  }, [socket,room]);
  return (
    <>
      {!room && (<div className='text-center'>New Chat</div>)}
      {room?.status === "waiting" && (<div className='h-full flex'><span className="loading loading-infinity loading-lg text-info m-auto"></span></div>)}
      {room?.status === "chatting" && room?.participants.every(participant => participant.roomId === room?.id) && (
        <div className='max-w-[850px] mx-auto w-full'>
            {roomMessages.length > 0 &&  
              roomMessages.map((roomMessage,index) => (
            <div key={index} ref={lastMessageRef}>
              <RoomMessage key={index} roomMessage={roomMessage}/>
            </div>))}
            {roomMessages.length ===  0 && (<p className='text-center'>Send a message to start the conversation</p>)}
        </div>
      )}
    </>
  );
}

export default NewChat;
