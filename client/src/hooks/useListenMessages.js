import { useEffect} from 'react';
import { useSocketContext } from '../context/SocketContext'
import  useConversation  from '../zustand/useConversation.js'
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation,messages, setMessages} = useConversation();
  
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      if (newMessage.senderId === selectedConversation._id) {
        setMessages([...messages, newMessage]);
      } 
      sound.play();
    });    

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages,selectedConversation]);
}

export default useListenMessages;
       
        
      
  

      