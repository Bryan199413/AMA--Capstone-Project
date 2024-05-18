import React, { useState } from "react"
import Theme from "./Theme";
import BlockedUsers from "./BlockedUsers";
import Notifications from "./Notifications";

function Settings({toggleMenu}) {
  const [tab, setTab] = useState("theme");

  const handleTab = tab => {
    setTab(tab);
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box max-w-[46rem]">
          <h3 className="font-bold text-lg border-b-2 border-base-300 pb-2">Settings</h3>
          <div method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={toggleMenu} >✕</button>
          </div>
          <div className="flex flex-col md:flex-row h-80">
             <div className="p-1 flex md:flex-col w-full md:w-80">
                <span className={`${tab === 'theme' ? 'bg-base-200' : ''}  flex flex-1 p-2 justify-center md:flex-none md:justify-start rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("theme")}>Theme
                 </span>
                <span className={`${tab === 'notifications' ? 'bg-base-200' : ''} flex flex-1 justify-center p-2 md:flex-none md:justify-start rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("notifications")}>Notifications
                 </span>
                <span className={`${tab === 'blockedUsers' ? 'bg-base-200' : ''} flex flex-1 justify-center p-2 md:flex-none md:justify-start rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("blockedUsers")}>Blocked
                 </span>
             </div>
             <div className="w-full overflow-auto p-2">
               {tab === "theme" && (<Theme />)}
               {tab === "notifications" && (<Notifications />)}
               {tab === "blockedUsers" && (<BlockedUsers />)}
               
             </div>
          </div>
        </div>
        <div method="dialog" className="modal-backdrop" onClick={toggleMenu}>   
        </div>
      </dialog>
    </>
  )
}
        
export default Settings

