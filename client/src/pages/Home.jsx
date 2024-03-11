import React from 'react'
import Navbar from '../Components/Navbar'
import SideNav from '../Components/Sidenav/SideNav'
import MessageContainer from '../Components/Messages/MessageContainer'
import MessageInput from '../Components/Messages/MessageInput'

function Home() {
  return (
    <div className='bg-base-100 h-screen'> 
     
      <div className='w-full max-h-screen overflow-hidden flex'>
        <div className='hidden lg:block'>
          <SideNav />
        </div>
        
        <div className='flex flex-col w-full h-screen'>
          <Navbar/>
          <MessageContainer/>
          <MessageInput />
        </div>
          
            
         
      </div>         
    </div>
  )
}

export default Home