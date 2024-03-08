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
   <div className='flex flex-col w-80 h-full bg-base-200 p-2'>
       <div className='h-full '>
          <div className='text-md flex justify-between rounded-lg bg-base-300 p-1'>
            <button className={tab === 'Chats' ? 'flex-1 py-2 rounded-lg bg-base-100' : 'flex-1 py-2 rounded-lg'} onClick={() => handleTab('Chats')}>Chats</button>
            <button className={tab === 'Friends' ? 'flex-1 py-2 rounded-lg bg-base-100' : 'flex-1 py-2 rounded-lg'} onClick={() => handleTab('Friends')}>Friends</button>
          </div>
           
            <div className={tab === 'Chats' ? 'block overflow-auto' : 'hidden'}>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer '>Talk to strangers</div>
               <div className="divider">Direct Messages</div>

               <div className=' h-[650px]'>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
               <div className='text-center text-[#41B8D5] p-2 bg-base-300 my-1 rounded-lg cursor-pointer'>Talk to strangers</div>
             
            </div>
           
     
          
              
             
               
            </div>

            <div className={tab === 'Friends' ? 'block text-center' : 'hidden'}>Friends</div>

           
        </div>
      
   
       
               
        
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