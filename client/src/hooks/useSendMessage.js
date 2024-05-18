import { useState } from "react"
import useConversation from "../zustand/useConversation"
import { toast } from 'sonner'
import sentMessageSound from '../assets/sounds/sentSound.wav'
import useNotifications from "../zustand/useNotifications"

const useSendMessage = () => {
  const [loading,setLoading] = useState(false)
  const {messages,setMessages, selectedConversation} = useConversation();
  const {sounds} = useNotifications();
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({message})
      })
      const data = await res.json();
      if(data.error) throw new Error(data.error)

      setMessages([...messages,data]);
      const sound = new Audio(sentMessageSound);
      sounds ? sound.play() : null;
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }

  return {sendMessage,loading}
}

export default useSendMessage
