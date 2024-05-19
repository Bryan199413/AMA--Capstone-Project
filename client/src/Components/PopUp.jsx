import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import useFriend from '../zustand/useFriend';
import useNotifications from '../zustand/useNotifications';

const PopUp = () => {
  const { socket } = useSocketContext();
  const { messages, selectedConversation, setSelectedConversation } = useConversation();
  const {sounds,popUp} = useNotifications();
  const { friends } = useFriend();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const popUpFriend = friends.find((friend) => friend._id === newMessage.senderId);
      if(selectedConversation._id === newMessage.senderId) return ;
      if(!popUp) return;
      if (popUpFriend) {
        toast.custom((t) =>  (
          <div 
            className={`${t.visible ? 'animate-enter' : 'animate-leave' } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-auto`}>
            <div className="flex-1 w-0 p-4 hover:cursor-pointer" onClick={()=> {
              setSelectedConversation(popUpFriend);
              toast.dismiss(t)
              } }>
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={popUpFriend.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {popUpFriend.username}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {newMessage.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => { toast.dismiss(t)}}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),{duration:100000});
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket,friends,selectedConversation,messages,sounds,popUp]);

  return null;
};

export default PopUp;
