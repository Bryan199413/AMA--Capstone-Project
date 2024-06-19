import React from 'react'
import useBlockUser from '../hooks/useBlockUser'
import useMatching from '../zustand/useMatching';
import useDeleteRoom from '../hooks/useDeleteRoom';
import useUnfriend from '../hooks/useUnfriend';
import useFriend from '../zustand/useFriend';
import useConversation from '../zustand/useConversation';
import useDeleteConversation from '../hooks/useDeleteConversation';

function BlockUserButton({friendId}) {
    const {room,receiverProfile,setRoom} = useMatching();
    const {deleteConversation} = useDeleteConversation();
    const {setSelectedConversation,selectedConversation,conversations} = useConversation();
    const {deleteRoom} = useDeleteRoom();
    const {blockUser,loading} = useBlockUser();
    const {unfriend} =  useUnfriend();
    const {friends} = useFriend();
    const userId = receiverProfile?._id;
 
    const handleBlockUser = async (userId) => {
       const isAlreadyFriend = friends.find(friend => friend._id === userId);
       const isAlreadyInRoom = room?.participants?.find(user => user === userId);
       const isAlreadyConversation = conversations.find(friend => friend._id === userId) 
       await blockUser(userId);
       if(isAlreadyFriend){
         await unfriend(userId);
       }
       if(isAlreadyInRoom && room?.status !== "chatEnded") {
        await deleteRoom();
       }
       if(isAlreadyInRoom) {
        setRoom(null);
       }
       if(isAlreadyConversation) {
        await deleteConversation(userId);
       }
       setSelectedConversation("New Chat");
    }
  return (
    <>   
        <button className="btn btn-sm" onClick={()=>document.getElementById('my_modal_5').showModal()}>Block</button>
        <dialog id='my_modal_5' className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4 ">Are you sure to block this user ? </p>
                <form method='dialog' className='flex justify-center gap-2'>
                    <button className='btn'>No</button>
                    <button className='btn btn-primary' onClick={() =>(loading ? null : handleBlockUser(selectedConversation === "New Chat" ? userId : friendId))}>Yes</button>
                </form>
            </div>
        </dialog>
    </>
)
    
}

export default BlockUserButton
