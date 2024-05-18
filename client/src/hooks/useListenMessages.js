import { useEffect} from 'react';
import { useSocketContext } from '../context/SocketContext'
import  useConversation  from '../zustand/useConversation.js'
import notificationSound from '../assets/sounds/notification.mp3'
import useNotifications from '../zustand/useNotifications';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation,messages, setMessages} = useConversation();
  const {sounds} = useNotifications();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedConversation._id) {
        setMessages([...messages, newMessage]);
       
      }
      const sound = new Audio(notificationSound);
      sounds ? sound.play() : null;
      
    });    

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages,selectedConversation,sounds]);
}

export default useListenMessages;
       
        
      
  

      