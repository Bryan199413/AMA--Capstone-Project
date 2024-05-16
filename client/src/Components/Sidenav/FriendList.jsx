import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import BlockUserButton from '../BlockUserButton';
import Unfriend from '../Unfriend';

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
    <div className='flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer'>
      <div className='flex items-center w-full'  onClick={handleSelect}>
        <div className={`avatar ${isOnline ? 'online' : ''} z-0`} >
          <div className="w-10 rounded-full">
            <img src={friend.avatar} alt="Avatar" />
          </div>
        </div>
        <div className='mx-2'><p>{friend.username}</p></div>
      </div>
      <div className='py-2 px-1'>
        <HiOutlineDotsVertical size={25}/>
        
      </div>
     

    </div>
  )
}

export default FriendList;
