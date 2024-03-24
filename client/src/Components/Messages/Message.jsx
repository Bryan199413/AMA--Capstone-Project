import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation"

function Message({message}) {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const avatar = fromMe ? authUser.avatar: selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' :'';
  
  return (
     <div>
        <div className={`chat ${chatClassName} mx-2`}>
          <div className="chat-image avatar">
            <div className="w-9 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={avatar} />
            </div>
          </div>
          <div className={`chat-bubble ${bubbleBgColor} whitespace-normal break-words ...`}>{message.message}</div>
          <div className="chat-footer opacity-50">
             <time className="text-xs opacity-50">{formattedTime}</time>
          </div>
      </div>
    </div>
  )
}

export default Message

