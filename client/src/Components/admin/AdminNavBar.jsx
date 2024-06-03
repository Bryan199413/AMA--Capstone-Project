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
     
      <div className="flex-1">
    <a className="text-2xl p-2">
      {isOpen === "Statistics" && 'Statistics'}
      {isOpen === "Feedback" && 'Feedback'}
      {isOpen === "ReportedUsers" && 'Reported Users'}
      {isOpen === "BannedUsers" && 'Banned Users'}
    </a>
</div>
   
    </div>
  )
}

export default AdminNavBar


