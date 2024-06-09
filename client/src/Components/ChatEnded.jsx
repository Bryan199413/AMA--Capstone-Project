import React from 'react'
import useMatching from '../zustand/useMatching'
import BlockUserButton from './BlockUserButton';
import ReportButton from './ReportButton';
import AddFriend from './AddFriend';
import FeedbackButton from './FeedbackButton';

function ChatEnded() {
   const {receiverProfile} = useMatching();

  return (
    <div className='max-w-[850px] mx-auto w-full my-3'>
      <div className='flex items-center p-2'>
        <img className="w-10 h-10 rounded-full" src={receiverProfile?.avatar} alt="Avatar" />
        <span className="p-2">{receiverProfile?.username}</span>        
      </div>
      <div className="dropdown-content  menu p-2 w-52 gap-2">
     <AddFriend />
       <BlockUserButton friendId={receiverProfile._id} />
       <ReportButton userId={receiverProfile._id} />
      </div>
      <p className='p-2 font-bold'>Chat has ended...</p>
      <div className='flex p-2'>
        <FeedbackButton />  
      </div>
    </div>
  )
}

export default ChatEnded
