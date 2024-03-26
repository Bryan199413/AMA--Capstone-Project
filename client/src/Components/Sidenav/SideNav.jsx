import React, { useState } from 'react';
import Menu from './Menu';
import { PiChatsDuotone } from "react-icons/pi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiChatNewLine } from "react-icons/ri";
import Conversations from './Conversations';
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation'

function SideNav({ setSideNav }) {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {loading,conversations} = useGetConversations()
  const [tab, setTab] = useState('Chats');

  const handleTab = tab => {
    setTab(tab);
  };

  return (
    <div className="flex flex-col w-72 h-full bg-base-200 p-2 z-20">
      <div className="flex justify-center items-center text-2xl min-h-[5rem]">
        <span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span>
      </div>
      <div className="text-md flex justify-between rounded-lg bg-base-300 p-1">
        <button
          className={`flex justify-center flex-1 py-1 rounded-md ${tab === 'Chats' ? 'bg-base-100' : ''}`}
          onClick={() => handleTab('Chats')}
        >
          <PiChatsDuotone size={20}/>
          <h1 className='px-1'>Chats</h1>
        </button>
        <button
          className={`flex justify-center flex-1 py-1 rounded-md ${tab === 'Friends' ? 'bg-base-100' : ''}`}
          onClick={() => handleTab('Friends')}
        >
          <LiaUserFriendsSolid size={20} />
          <h1 className='px-1'>Friends</h1>
        </button>
      </div>

      <div className={tab === 'Chats' ? 'block' : 'hidden'}>
        <div className={`flex justify-center text-sm hover:bg-base-100 p-2 my-1 rounded-md cursor-pointer ${selectedConversation === 'New Chat' ? 'bg-base-100' : ''}`}
          onClick={() => setSelectedConversation('New Chat')}>
          <RiChatNewLine  size={20}/>
          <h1 className='px-1'>New chat</h1>
        </div>
        <div className="divider">Direct Messages</div>
      </div>

      <div className="chatsAndFriends overflow-y-auto h-screen">
        <div className={tab === 'Chats' ? 'block' : 'hidden'}>
            {conversations.map((conversation) => (
              <Conversations setSideNav={setSideNav}
              key={conversation._id}
              conversation={conversation}
              />
            ))}
           {loading ? <div className='flex justify-center items-center'><span className="loading loading-spinner loading-md"></span></div> : null}
        </div>
        <div className={tab === 'Friends' ? 'block text-center' : 'hidden'}>Friends</div>
      </div>
      <Menu />
    </div>
  );
}

export default SideNav;
