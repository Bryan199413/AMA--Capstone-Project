import React, { useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdLogout, MdOutlineSettings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import useLogout from '../../hooks/useLogout';

function Menu() {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('machimachi-user'));
  const { avatar: avatarURL, username } = userData || {};

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" onBlur={handleBlur}  tabIndex={0}>
      <button
        className={`flex items-center w-full justify-between p-2 rounded-md ${isOpen ? 'bg-base-100' : 'hover:bg-base-100'}`}
        onClick={() => setIsOpen(prev => !prev)}
        >
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={avatarURL} alt="Avatar" />
            </div>
          </div>
          <div className="mx-2">{username}</div>
        </div>
        {isOpen ? <MdOutlineKeyboardArrowDown size={20} /> : <MdOutlineKeyboardArrowUp size={20} />}
      </button>
      {isOpen && (
        <div className="absolute bottom-14 rounded-md shadow-md border border-base-300 bg-base-200 left-0 w-full">
          <ul className="cursor-pointer">
            <li className="hover:bg-base-100 flex items-center p-2 m-2 rounded-md">
              <RxAvatar size={20} />
              <span className="mx-2">Change avatar</span>
            </li>
            <li className="hover:bg-base-100 flex items-center p-2 m-2 rounded-md">
              <MdOutlineSettings size={20} />
              <span className="mx-2">Settings</span>
            </li>
            <li className="hover:bg-base-100 flex items-center p-2 m-2 rounded-md" onClick={logout}>
              <MdLogout size={20} />
              <span className="mx-2">Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
