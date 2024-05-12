import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

const useListenConversations = () => {
    const { socket } = useSocketContext();
    const {conversations,setConversations} = useConversation();

    useEffect(() => {
      const handleNewConversationsforSender = (newConversation) => {
         setConversations([...conversations,newConversation]) 
      };

      const handleNewConversationsforReceiver = (newConversation) => {
         setConversations([...conversations,newConversation]) 
      };
      

      socket?.on("newConversationForSender", handleNewConversationsforSender);
      socket?.on("newConversationForReceiver",handleNewConversationsforReceiver);
  
  
      return () => {
        socket?.off("newConversationForSender", handleNewConversationsforSender);
        socket?.off("newConversationForReceiver",handleNewConversationsforReceiver);
      };
    }, [socket,conversations,setConversations]);
}

export default useListenConversations
