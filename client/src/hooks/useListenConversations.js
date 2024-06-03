import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

const useListenConversations = () => {
    const { socket } = useSocketContext();
    const {conversations,setConversations,selectedConversation,setSelectedConversation} = useConversation();

    useEffect(() => {
      const handleNewConversationsforSender = (newConversation) => {
         setConversations([...conversations,newConversation]) 
      };

      const handleNewConversationsforReceiver = (newConversation) => {
         setConversations([...conversations,newConversation]) 
      };

      const handleDeletedConversation = (friendId) => {
        const updatedConversations = conversations.filter(friend => friend._id !== friendId); 
           setConversations(updatedConversations);
      }
      

      socket?.on("newConversationForSender", handleNewConversationsforSender);
      socket?.on("newConversationForReceiver",handleNewConversationsforReceiver);
      socket?.on("deletedConversation",handleDeletedConversation);
  
      return () => {
        socket?.off("newConversationForSender", handleNewConversationsforSender);
        socket?.off("newConversationForReceiver",handleNewConversationsforReceiver);
      };
    }, [socket,conversations,setConversations,selectedConversation,setSelectedConversation]);
}

export default useListenConversations
