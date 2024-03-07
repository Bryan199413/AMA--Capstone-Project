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
   <div className='flex flex-col w-80 h-full bg-base-200 p-2'>
        
       <div className='text-md flex justify-between rounded-lg bg-base-300 p-1'>
          <button className='flex-1 py-2 rounded-lg focus:bg-base-100'>Chats</button>
          <button className='flex-1 py-2 rounded-lg focus:bg-base-100'>Friends</button>
       </div>
   
         <div className='h-[100%] text-center'>Messages & friends list</div>
               
        
         <div className='p-3 flex justify-between items-center hover:bg-base-100'>
          <div className="avatar  flex justify-center items-center">
            <div className="w-9 rounded-full">
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
  );
}

export default SideNav;