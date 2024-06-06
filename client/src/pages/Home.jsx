import React from 'react'
import Navbar from '../Components/Navbar'
import SideNav from '../Components/Sidenav/SideNav'
import MessageContainer from '../Components/Messages/MessageContainer'
import MessageInput from '../Components/Messages/MessageInput'
import useGetUserRequests from '../hooks/useGetUserRequests'
import PopUp from '../Components/PopUp'
import TermOfUse from '../Components/TermOfUse'
import ChatRules from '../Components/ChatRules'

function Home() {
  useGetUserRequests();
 
  return (
    <div className='bg-base-100 h-screen'> 
     
      <div className='w-full max-h-screen overflow-hidden flex'>
        <div className='absolute left-[-100%] lg:relative lg:left-0'>
          <SideNav />
        </div>
        
        <div className='flex flex-col w-full h-screen'>
          <Navbar/>
          <MessageContainer/>
          <MessageInput />
        </div>
            
      </div>  
      <PopUp />
      <TermOfUse />
      <ChatRules />
    </div>
  )
}

export default Home;

