import { useState } from "react";
import useConversation from "../zustand/useConversation";


const useDeleteConversation = () => {
    const [loading,setLoading] = useState(false);
    const {conversations,setConversations} = useConversation();
   
    const deleteConversation = async (friendId) => {
       setLoading(true);
       try {
           const res = await fetch(`api/messages/delete/${friendId}`,{
               method:"DELETE",
               headers:{"Content-Type" : "application/json"},
           });
           
           if (!res.ok) {
             throw new Error('Failed to delete conversation');
           }
     
           const updatedConversations = conversations.filter(friend => friend._id !== friendId); 
           setConversations(updatedConversations);
       } catch (error) {
           toast.error(error.error);
       } finally {
           setLoading(false);
       }
    }
   
    return {loading,deleteConversation};
   }
   

export default useDeleteConversation;
