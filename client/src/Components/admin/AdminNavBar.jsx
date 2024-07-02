import React, { useState } from 'react'
import AdminSideNav from './AdminSideNav';
import { CiMenuBurger } from "react-icons/ci";


function AdminNavBar({setIsOpen,isOpen}) {
    const [sideNav,setSideNav] = useState(false);
  return (
    <div className="navbar bg-base-100 border-base-300 shadow-lg z-30">
         <div className='lg:hidden'>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={sideNav} onChange={() => setSideNav(!sideNav)}/>
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn drawer-button" ><CiMenuBurger size={20}/></label>
          </div> 
          <div className="drawer-side z-[1]"> 
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <AdminSideNav setSideNav={setSideNav}  setIsOpen={setIsOpen} isOpen={isOpen}/>
          </div>
        </div>
      </div>
     
      <div className='mx-auto text-2xl font-bold'>
        {isOpen === "Statistics" && 'Statistics'}
        {isOpen === "Feedback" && 'Feedback'}
        {isOpen === "ReportedUsers" && 'Reported'}
        {isOpen === "BannedUsers" && 'Banned'}
      </div> 
   
    </div>
  )
}

export default AdminNavBar
   
   


