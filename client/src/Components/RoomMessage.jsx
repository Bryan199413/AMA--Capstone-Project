import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import AddFriend from './AddFriend';
import BlockUserButton from './BlockUserButton';
import ReportButton from './ReportButton';
import useMatching from '../zustand/useMatching';

function RoomMessage({ roomMessage, index }) {
    const {receiverProfile} = useMatching();
    const { authUser } = useAuthContext();
    const fromMe = roomMessage.senderId === authUser._id;
    const currentTime = new Date(); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const avatar = fromMe ? authUser.avatar : roomMessage.avatar;
    const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' : '';
    const [isOpen, setIsOpen] = useState(false);
    const [currentOpenIndex, setCurrentOpenIndex] = useState(null);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (index === currentOpenIndex) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [index, currentOpenIndex]);

    const handleToggle = (clickedIndex) => {
        setCurrentOpenIndex(clickedIndex === currentOpenIndex ? null : clickedIndex);
    };

    return (
        <div className={`chat ${chatClassName} mx-2`}>
            <div className="chat-image avatar ">
                <div className={`w-9 rounded-full ${!fromMe ? 'cursor-pointer' : ''}`} onClick={() => handleToggle(index)}>
                  <img alt="Tailwind CSS chat bubble component" src={avatar} />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleBgColor} whitespace-normal break-words ...`}>{roomMessage.message}</div>
            <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">{formattedTime}</time>
            </div>

            {!fromMe && isOpen && (
              <div ref={dropdownRef} className='relative'> 
                  <ul className="dropdown-content absolute top-0 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                    <ReportButton userId={receiverProfile._id}/>
                    <BlockUserButton />
                    <AddFriend />
                  </ul>
              </div>
            )}  
        </div>
    );
}

export default RoomMessage;
