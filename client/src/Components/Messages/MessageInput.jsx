import React from 'react'
import { TbPhotoAi } from "react-icons/tb";
import { BiSend } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";

function MessageInput() {
  return (
    <div className='px-2 pb-2'>
        <label className="input input-bordered flex items-center gap-2 max-w-[850px] mx-auto">
        <TbPhotoAi size={30}/>
        <input type="text" className="grow" placeholder="Type here" />
        <MdInsertEmoticon size={30} />
        <BiSend size={30} />
        </label>
    </div>  
  )
}

export default MessageInput
