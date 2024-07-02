import React from 'react'
import { FcStatistics } from "react-icons/fc";
import { VscFeedback } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { IoBanSharp } from "react-icons/io5";
import {  MdLogout } from 'react-icons/md';
import useLogout from '../../hooks/useLogout';

function AdminSideNav({setIsOpen,isOpen,setSideNav}) {
  const { logout } = useLogout();

  const handleStatistics = () => {
    setIsOpen("Statistics");
    if (setSideNav){
      setSideNav(false)
    }
  }

  const handleFeedback = () => {
    setIsOpen("Feedback");
    if (setSideNav){
      setSideNav(false)
    }
  }

  const handleReportedUsers = () => {
    setIsOpen("ReportedUsers");
    if (setSideNav){
      setSideNav(false)
    }
  }

  const handleBannedUsers = () => {
    setIsOpen("BannedUsers");
    if (setSideNav){
      setSideNav(false)
    }
  }

  return (
    <div className="flex flex-col w-72 h-full bg-base-200 p-2 z-20">
      <div className="flex justify-center items-center text-3xl min-h-[5rem]">
        <span className='text-[#41B8D5]'>Dash Board</span>
      </div>
     
     <div className='flex flex-col justify-between h-full'>
      <div>  
        <div className={`flex items-center p-2 text-xl gap-3 rounded-md cursor-pointer ${isOpen === "Statistics" ? 'bg-base-100' : ''}`} onClick={handleStatistics}>
            <FcStatistics size={25} />
            <div>Statistics</div>
        </div>

        <div className={`flex  items-center p-2 text-xl gap-3 rounded-md cursor-pointer ${isOpen === "Feedback" ? 'bg-base-100' : ''}`} onClick={handleFeedback}>
          <VscFeedback size={25} />
          <div>Feedback</div>
        </div>

        <div className={`flex  items-center p-2 text-xl gap-3 rounded-md cursor-pointer ${isOpen === "ReportedUsers" ? 'bg-base-100' : ''}`} onClick={handleReportedUsers}>
          <TbReportSearch size={25} />
          <div>Reported</div>
        </div>

        <div className={`flex  items-center p-2 text-xl gap-3 rounded-md cursor-pointer ${isOpen === "BannedUsers" ? 'bg-base-100' : ''}`} onClick={handleBannedUsers}>
          <IoBanSharp size={25} />
          <div>Banned</div>
        </div>
      </div>

      <div className="hover:bg-base-100 cursor-pointer flex items-center p-2 text-xl rounded-md" onClick={logout}>
      
              <MdLogout size={20} />
              <span className="mx-2">Log out</span>
            
      </div>
     </div>
     
      
    </div>
  )
}

export default AdminSideNav
