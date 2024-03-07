import React, { useState } from 'react';
import { FcSettings } from "react-icons/fc";
import { CiLogout } from "react-icons/ci";
import useLogout from '../hooks/useLogout';


function SideNav() {
  const {logout} = useLogout()
  
  const storedData = localStorage.getItem("machimachi-user");
  const userData = JSON.parse(storedData);
  const avatarURL = userData.avatar;
  return (
   <div className='w-80 h-full bg-base-200 mx-auto'>
      <div className='flex flex-col h-full'>
         
      
        <div className='flex h-[10%] mx-1'>
          <span className="flex-1 flex justify-center items-center border-b hover:text-blue-700 cursor-pointer">Chats</span>
          <span className="flex-1 flex justify-center items-center border-b hover:text-blue-700 cursor-pointer">Friends</span>
        </div>

         <div className='h-[82%] text-center'>chat & friends list</div>
         
        
         <div className='h-[8%] flex justify-between items-center'>
          <div className="avatar px-3 flex justify-center items-center">
            <div className="w-10 h-10 rounded-full">
              <img src={avatarURL} />
            </div>
          </div>
        
           <div className="dropdown dropdown-top dropdown-end p-3">
              <div tabIndex={0} role="button"><FcSettings size={30}/></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li onClick={logout}><a><CiLogout/>Log out</a></li>
              </ul>
            </div>        
          </div> 

      </div>
   </div>
  );
}

export default SideNav;