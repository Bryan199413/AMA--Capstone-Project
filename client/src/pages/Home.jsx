import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import SideNav from '../Components/Sidenav/SideNav'
import MessageContainer from '../Components/Messages/MessageContainer'
import MessageInput from '../Components/Messages/MessageInput'
import useGetUserRequests from '../hooks/useGetUserRequests'
import PopUp from '../Components/PopUp'
import TermOfUse from '../Components/TermOfUse'
import ChatRules from '../Components/ChatRules'
import ImageGenerator from '../Components/ImageGenerator'
import useImageGenerator from '../zustand/useImageGenerator'
import Ads from '../Components/Ads'
import useListenBanUser from '../hooks/admin/useListenBanUser'

function Home() {
  useGetUserRequests();
  useListenBanUser();
  const {isOpenImageGenerator} =  useImageGenerator();
  const [ads,setAds] = useState(false);

  useEffect(() => {
    let timeout;
    if (!ads) {
      timeout = setTimeout(() => {
        setAds(true);
      }, 60000);
    }

    return () => clearTimeout(timeout);
  }, [ads, setAds]);
  
  return (
    <div className='bg-base-100 h-screen'> 
     
      <div className='w-full max-h-screen overflow-hidden flex'>
        <div className='absolute left-[-100%] lg:relative lg:left-0'>
          <SideNav />
        </div>
        
        <div className='flex flex-col w-full h-screen'>
          <Navbar/>
          {ads && (<Ads setAds={setAds} ads={ads}/>)}
          <MessageContainer/>
          {isOpenImageGenerator && ( <ImageGenerator />)}
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

