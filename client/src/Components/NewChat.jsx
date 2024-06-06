import React, { useEffect, useRef } from 'react';
import useMatching from '../zustand/useMatching';
import notificationSound from '../assets/sounds/notification.mp3'
import sentSound from '../assets/sounds/sentSound.wav'
import { useSocketContext } from '../context/SocketContext';
import RoomMessage from './RoomMessage';
import { useAuthContext } from '../context/AuthContext';
import useNotifications from '../zustand/useNotifications';
import Welcome from './Welcome'

function NewChat() {
  const { room, roomMessages,setRoomMessages } = useMatching();
  const { authUser} = useAuthContext();
  const { socket } = useSocketContext();
  const {sounds} = useNotifications();
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
            if (sounds) senderSound.play();
          } else  {
            if (sounds) recieverSound.play();
          }
        } 
      });    
      return () => socket?.off("newMessageInRoom");
  }, [socket,room,sounds]);
  return (
    <>
      {!room && (<Welcome />)}
      {room?.status === "waiting" && (<div className='h-full flex'><span className="loading loading-infinity w-40 text-info m-auto"></span></div>)}
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
