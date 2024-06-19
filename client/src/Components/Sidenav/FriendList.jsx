import React from 'react'
import { IoPersonRemove } from "react-icons/io5";
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import useUnfriend from '../../hooks/useUnfriend';
import useDeleteConversation from '../../hooks/useDeleteConversation';

function FriendList({setSideNav,friend,setTab}) {
   const {onlineUsers} = useSocketContext();
   const {setSelectedConversation,conversations} = useConversation();
   const isOnline = onlineUsers.includes(friend._id) 
   const {loading,unfriend} = useUnfriend();
   const {deleteConversation} = useDeleteConversation();
  
   const handleSelect = () => {
    setSelectedConversation(friend);
    setTab('Chats');
    if (setSideNav) {
      setSideNav(false);
    }
   }

   const handleUnfriend = async (friendId) => {
    const isAlreadyConversation = conversations.find(friend => friend._id === friendId); 
    await unfriend(friendId);
    if(isAlreadyConversation) {
      await deleteConversation(friendId);
    }
    setSelectedConversation("New Chat")
  }
  return (
    <div className='flex items-center text-sm p-1 hover:bg-base-100 my-1 rounded-md cursor-pointer group'>
      <div className='flex items-center w-full'  onClick={handleSelect}>
        <div className={`avatar ${isOnline ? 'online' : ''} z-0`} >
          <div className="w-10 rounded-full">
            <img src={friend.avatar} alt="Avatar" />
          </div>
        </div>
        <div className='mx-2'><p>{friend.username}</p></div>
      </div>
      <div className='py-2 px-1  opacity-0 group-hover:opacity-100 transition-opacity' onClick={() =>(loading ? null : handleUnfriend(friend._id))}>
       <IoPersonRemove size={18} color='red'/>
      </div>
     

    </div>
  )
}

export default FriendList;
