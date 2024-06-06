import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import TermOfUse from './TermOfUse'
import useNotifications from '../zustand/useNotifications';
function Welcome() {
    const {authUser} = useAuthContext();
    const {setChatRules} = useNotifications();
    const handleTermofUse = () => {
       setChatRules(true);
    }
  return (
    <div className='max-w-[850px] mx-auto w-full my-3'>
     <div className='text-5xl font-extrabold p-3 text-[#9149e4] text-center'>Hello, <span>{authUser.username}</span></div>
     <div className='text-3xl text-center p-2'>Have fun chatting, be respectful and follow our <a className="link link-info" onClick={handleTermofUse}>rules</a></div>
    </div>
  )
}

export default Welcome;
