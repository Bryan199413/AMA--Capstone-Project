import React from 'react'

function SideNav() {
  return (
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked/>
        <div className="drawer-content">
            {/* Page content here */}
        </div> 
        <div className="drawer-side w-80">
            
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border z-0">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            
            </ul>
        </div>
</div>
  )
}

export default SideNav
