import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdLogout, MdOutlineSettings,} from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import useLogout from '../../hooks/useLogout';
import Settings from '../SettingsComponent/Settings'
import ChangeAvatar from '../SettingsComponent/ChangeAvatar';

function Menu() {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSettings,setSelectedSettings] = useState(false)
  const [selectedChangeAvatar,setSelectedChangeAvatar] = useState(false)
  const userData = JSON.parse(localStorage.getItem('machimachi-user'));
  const { avatar: avatarURL, username } = userData || {};
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target) ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    setSelectedSettings(false)
    setSelectedChangeAvatar(false)
  };
  const toggleSettings = () => {
    document.getElementById('my_modal_2').showModal()
    setSelectedSettings(true)
  }
  const toggleChangeAvatar = () => {
    document.getElementById('my_modal_3').showModal()
    setSelectedChangeAvatar(true)
  }
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`flex items-center w-full justify-between p-2 rounded-md ${isOpen ? 'bg-base-100' : 'hover:bg-base-100'}`}
        onClick={toggleMenu}
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
            <li className={`${selectedChangeAvatar ? 'bg-base-100' : ''} hover:bg-base-100 flex items-center p-2 m-2 rounded-md`} onClick={toggleChangeAvatar}>
              <RxAvatar size={20} />
              <span className="mx-2">Avatar</span>
            </li>
             <ChangeAvatar toggleMenu={toggleMenu}/>
            <li className={`${selectedSettings ? 'bg-base-100' : ''} hover:bg-base-100 flex items-center p-2 m-2 rounded-md`} onClick={toggleSettings}>
              <MdOutlineSettings size={20} />
              <span className="mx-2">Settings</span>
            </li>
             <Settings toggleMenu={toggleMenu} />
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
