import React, { useState } from 'react'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import { MdLogout,MdOutlineSettings } from "react-icons/md";

import useLogout from '../hooks/useLogout';

function Menu() {
    const {logout} = useLogout()
    const [isOpen,setIsOpen] = useState(false)    

    const storedData = localStorage.getItem("machimachi-user");
    const userData = JSON.parse(storedData);
    const avatarURL = userData.avatar;
    const username = userData.username;
  return (
    <div className='relative'>   
      <button className={!isOpen ? 'flex items-center w-full justify-between p-2 rounded-md hover:bg-base-100' : ' relative flex items-center w-full justify-between bg-base-100 p-2 rounded-md'}  
         onClick={() => setIsOpen((prev) => !prev)}>
            <div className='flex items-center'>
                <div className="avatar">
                    <div className="w-9 rounded-full">
                      <img src={avatarURL} />
                    </div>
                </div>
                <div className='mx-2'>{username}</div>
            </div>
        {!isOpen ? ( <MdOutlineKeyboardArrowUp size={20} />) : (<MdOutlineKeyboardArrowDown size={20} />)}
     </button>
        {isOpen ? ( <div className='absolute bottom-14 rounded-md shadow-lg bg-base-100 left-0 w-full'>
            <ul className='cursor-pointer'>
                <li className='hover:bg-base-200 flex items-center p-2 m-2 rounded-md'><RxAvatar size={20}/><span className='mx-2'>Change avatar</span></li>
                <li className='hover:bg-base-200 flex items-center p-2 m-2 rounded-md'><MdOutlineSettings size={20}/><span className='mx-2'>Settings</span></li>
                <li className='hover:bg-base-200 flex items-center p-2 m-2 rounded-md' onClick={logout}><MdLogout size={20}/><span className='mx-2'>Log out</span></li>
            </ul>
        </div>) : null}
    </div>
  )
}

export default Menu