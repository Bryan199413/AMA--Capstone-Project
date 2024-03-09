import React, { useState } from 'react';
import { FcSettings } from "react-icons/fc";
import { CiLogout } from "react-icons/ci";
import useLogout from '../hooks/useLogout';

function SideNav() {
  const {logout} = useLogout()
  const [tab,setTab] = useState('Chats')

  const storedData = localStorage.getItem("machimachi-user");
  const userData = JSON.parse(storedData);
  const avatarURL = userData.avatar;

  const handleTab = (tab) => {
    setTab(tab)  
  }

  return (
   <div className='flex flex-col w-72 h-full bg-base-200 p-2'>
      <div className='text-md flex justify-between rounded-lg bg-base-300 p-1'>
        <button className={tab === 'Chats' ? 'flex-1 py-1 rounded-md bg-base-100' : 'flex-1 py-1 rounded-md'} 
          onClick={() => handleTab('Chats')}>Chats</button>
        <button className={tab === 'Friends' ? 'flex-1 py-1 rounded-md bg-base-100' : 'flex-1 py-1 rounded-md'} 
          onClick={() => handleTab('Friends')}>Friends</button>
      </div>
      
      <div className={tab === 'Chats' ? 'block' : 'hidden'}>
        <div className='text-sm bg-base-300 text-center text-[#41B8D5] p-2 my-1 rounded-md cursor-pointer'>New chat</div>
        <div className="divider">Direct Messages</div>
      </div>
      
      <div className='chatsAndFriends overflow-y-auto h-screen '>
        <div className={tab === 'Chats' ? 'block' : 'hidden'}>
        
          <div className='flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer'>
            <div className="avatar online ">
              <div className="w-8  rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className='mx-2'>jongga123</div>
          </div>
          

       </div>
       <div className={tab === 'Friends' ? 'block text-center' : 'hidden'}>Friends</div>
     </div>
       
      
          
          
      <div className='p-1 flex justify-between rounded-md items-center hover:bg-base-100'>
        <div className="avatar  flex justify-center items-center">
          <div className="w-8 rounded-full">
            <img src={avatarURL} />
          </div>
        </div>
      
        <div className="dropdown dropdown-top dropdown-end p-3">
            <div tabIndex={0} role="button"><FcSettings size={30}/></div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li onClick={logout}><a><CiLogout/>Log out</a></li>
            </ul>
          </div>        
      </div> 
   </div>
  );
}

export default SideNav;
    
          
          
           

             
        
            
                       


           
      
   
       
               
        