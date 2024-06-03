import React, { useState } from 'react'
import AdminNavBar from '../Components/admin/AdminNavBar'
import AdminSideNav from '../Components/admin/AdminSideNav'
import Statistics from '../Components/admin/Statistics'
import Feedback from '../Components/admin/Feedback'
import ReportedUsers from '../Components/admin/ReportedUsers'
import BannedUsers from '../Components/admin/BannedUsers'

function AdminDashBoard() {
  const [isOpen,setIsOpen] = useState("Statistics")
  return (
    <div className='bg-base-100 h-screen'>
      <div className='w-full h-screen overflow-hidden flex'>
       
      <div className='absolute left-[-100%] lg:relative lg:left-0'>
          <AdminSideNav setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        
        
        <div className='flex flex-col w-full h-screen'>
          <AdminNavBar setIsOpen={setIsOpen} isOpen={isOpen}/>
          {isOpen === "Statistics" && (<Statistics /> )}
          {isOpen === "Feedback" && (<Feedback />)}
          {isOpen === "ReportedUsers" && (<ReportedUsers />)}
          {isOpen === "BannedUsers" && (<BannedUsers />)}     
        </div>
            
      </div>  
     
    </div>
  )
}

export default AdminDashBoard
