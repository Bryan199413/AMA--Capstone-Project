import React from 'react'
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

function FriendList({setSideNav,friend,setTab}) {
   const {onlineUsers} = useSocketContext();
   const {setSelectedConversation} = useConversation();
   const isOnline = onlineUsers.includes(friend._id) 
  
   const handleSelect = () => {
    setSelectedConversation(friend);
    setTab('Chats');
    if (setSideNav) {
      setSideNav(false);
    }
   }
  return (
    <div className='flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer'
     onClick={handleSelect}
     >
      <div className={`avatar ${isOnline ? 'online' : ''} z-0`} >
        <div className="w-10 rounded-full">
          <img src={friend.avatar} alt="Avatar" />
        </div>
      </div>
      <div className='mx-2'><p>{friend.username}</p></div>
    </div>
  )
}

export default FriendList;
