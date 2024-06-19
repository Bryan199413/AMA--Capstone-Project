import React, { useEffect, useRef, useState } from 'react'
import { BiSend } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";
import { TbPhotoAi } from "react-icons/tb";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useSendMessage from '../../hooks/useSendMessage';
import useConversation from '../../zustand/useConversation';
import MatchingButton from '../MatchingButton';
import useMatching from '../../zustand/useMatching';
import useRoomMessage from '../../hooks/useRoomMessage';
import useImageGenerator from '../../zustand/useImageGenerator';
import useTheme from '../../zustand/useTheme';

function MessageInput() {
  const {room} = useMatching();
  const [disabled,setDisabled] = useState(true)
  const { selectedConversation } = useConversation();
  const {theme} = useTheme();
  const [message,setMessage] = useState("");
  const {sendMessage,loading} = useSendMessage()
  const {sendMessageRoom,loadingM} = useRoomMessage();
  const {isOpenImageGenerator,setIsOpenImageGenerator} = useImageGenerator();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (room?.status === "chatting") {
      setDisabled(false);
    } else {
      setDisabled(true);
      setMessage("");
    }
  }, [room?.status]);

  useEffect(() => {
    inputRef.current.focus();
    setMessage("")
  }, [selectedConversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !message.trim()) return;
    if(selectedConversation === "New Chat"){
      sendMessageRoom(message) 
    } else {
       sendMessage(message);
    }  
      setMessage("");
  }
   
  const toggleImageGenerator = () => {
    setIsOpenImageGenerator(!isOpenImageGenerator);
  };

  const handleEmojiPickerBlur = () => {
    setShowEmojiPicker(false);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };
  return (
    <form className='mx-1 py-2' onSubmit={handleSubmit} >
        <div className="flex items-center gap-2 max-w-[850px] mx-auto px-1">
          <MatchingButton/>
          {!isOpenImageGenerator  ? 
          (<button type='button' className='cursor-pointer'
           disabled={selectedConversation === "New Chat" && disabled} 
           onClick={toggleImageGenerator} ><TbPhotoAi size={28} /></button>)
           :
           (<div className='cursor-pointer'><TbPhotoAi size={28} /></div>)
          } 
          <input
          disabled={selectedConversation === "New Chat" && disabled}
          type="text" 
          className="grow border px-4 py-2 rounded-full border-none bg-base-300 outline-none"
          placeholder="Type a message..." 
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
          <button type='button' className="relative"  disabled={selectedConversation === "New Chat" && disabled}>
          <MdInsertEmoticon size={28} className="cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
          {showEmojiPicker && (
           <div type='button' className='absolute bottom-10 -right-2 z-10' 
            onBlur={handleEmojiPickerBlur}
           > 
            <Picker
              data={data}
              exceptEmojis={['middle_finger']}
              autoFocus={true}
              onEmojiSelect={addEmoji}
              theme={theme === "dark" ? "dark" : "light"}
            /> 
          </div>
          )}
        </button>
          <button type='submit' 
          disabled={loading || loadingM ? true : false}>
            <BiSend size={35} 
          className={`btn ${loading || loadingM ? 'text-base-300' : 'text-blue-700'} p-0 bg-transparent hover:bg-transparent border-none shadow-none `} />
          </button>
        </div>
    </form>              
  )
}

export default MessageInput
