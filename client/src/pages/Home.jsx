import React from 'react'
import Navbar from '../Components/Navbar'
import SideNav from '../Components/SideNav'

function Home() {
  return (
    <div className='bg-base-300 h-screen flex flex-col'>
        <Navbar/>
       
        <div className='w-full  h-full flex'>
           <div className='hidden lg:block'>
           <SideNav />
           </div>
            
           <div className='text-center w-full'>
           chatbox here!
           </div>
        </div>
        
       
    </div>
  )
}

export default Home