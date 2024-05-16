import React, { useState } from "react"
import Theme from "./Theme";
import BlockedUsers from "./BlockedUsers";

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
          <div className="flex h-80">
             <div className="w-52 flex flex-col p-1">
                <div className={`${tab === 'theme' ? 'bg-base-200' : ''} p-2 rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("theme")}>Theme
                 </div>
                <div className={`${tab === 'notifications' ? 'bg-base-200' : ''} p-2 rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("notifications")}>Notifications
                 </div>
                <div className={`${tab === 'blockedUsers' ? 'bg-base-200' : ''} p-2 rounded-md cursor-pointer`} 
                 onClick={()=> handleTab("blockedUsers")}>Blocked Users
                 </div>
             </div>
             <div className="w-full overflow-auto">
               {tab === "theme" && (<Theme />)}
               {tab === "notifications" && (<div>notif content</div>)}
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

