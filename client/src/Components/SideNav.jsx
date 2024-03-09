import React, { useState } from 'react';
import Menu from './Menu';
function SideNav() {
 
  const [tab,setTab] = useState('Chats')
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
     <Menu />
   </div>
  );
}

export default SideNav;
    
          
          
           

             
        
            
                       


           
      
   
       
               
        