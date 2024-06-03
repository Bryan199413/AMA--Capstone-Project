import React, { useState } from 'react';
import { RiMenuUnfoldLine } from "react-icons/ri";
import SideNav from './Sidenav/SideNav';
import useConversation from '../zustand/useConversation';
import FriendRequests from './FriendRequests';
import NewChatHeader from './NewChatHeader';

function Navbar() {
  const {selectedConversation} = useConversation();
  const [sideNav,setSideNav] = useState(false); 
  
  return (
    <div className="navbar bg-base-100 border-base-300 shadow-lg z-30">
      <div className='lg:hidden mr-4'>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={sideNav} onChange={() => setSideNav(!sideNav)}/>
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn drawer-button" ><RiMenuUnfoldLine size={30} /></label>
          </div> 
          <div className="drawer-side z-[1]"> 
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <SideNav setSideNav={setSideNav} />
          </div>
        </div>
      </div>
        
      <div className="flex-1 text-xl">
        {selectedConversation === 'New Chat' ? (<NewChatHeader />) 
        : 
        (<div className='flex items-center'>
          <img className="w-10 h-10 rounded-full" src={selectedConversation.avatar} alt="Avatar" />
          <span className="p-2">{selectedConversation.username}</span>        
        </div>)}
      </div>
       <div className='flex justify-center items-center'>
          <FriendRequests/> 
       </div>
    </div>
  );
}

export default Navbar;





    