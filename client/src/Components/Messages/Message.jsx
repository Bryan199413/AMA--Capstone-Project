import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation"
import BlockUserButton from "../BlockUserButton";
import Unfriend from "../Unfriend";

function Message({message}) {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const avatar = fromMe ? authUser.avatar: selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' :'';
  const [isOpen, setIsOpen] = useState(false);
  const [currentOpenId, setCurrentOpenId] = useState(null);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsOpen(false);
          }
      };

      window.addEventListener('click', handleClickOutside);

      return () => {
          window.removeEventListener('click', handleClickOutside);
      };
  }, []);

  useEffect(() => {
      if (message.id === currentOpenId) {
          setIsOpen(true);
      } else {
          setIsOpen(false);
      }
  }, [message.id, currentOpenId]);

  const handleToggle = (clickedId) => {
      setCurrentOpenId(clickedId === currentOpenId ? null : clickedId);
  };
  
  return (
      <div className={`chat ${chatClassName} mx-2`}>
        <div className="chat-image avatar" >
          <div className={`w-9 rounded-full ${!fromMe ? 'cursor-pointer' : ''}`} onClick={() => handleToggle(message.id)}>
            <img alt="Tailwind CSS chat bubble component" src={avatar} />
          </div>
        </div>
        <div className={`chat-bubble ${bubbleBgColor} whitespace-normal break-words ...`}>{message.message}</div>
        <div className="chat-footer opacity-50">
            <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
        {!fromMe && isOpen && (
              <div ref={dropdownRef} className='relative'> 
                  <ul className="dropdown-content absolute top-0 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                    <button type='button' className='btn btn-sm btn-error'>Report</button>
                    <BlockUserButton />
                    <Unfriend friendId={selectedConversation._id}/>
                  </ul>
              </div>
            )}  
      </div>
 )
 
}
export default Message
    


