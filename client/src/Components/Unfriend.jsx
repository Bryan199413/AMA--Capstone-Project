import React from 'react'
import useUnfriend from '../hooks/useUnfriend'
import useConversation from '../zustand/useConversation';
import useDeleteConversation from '../hooks/useDeleteConversation';

function Unfriend({ friendId }) {
    const {loading,unfriend} = useUnfriend();
    const {conversations,setSelectedConversation} = useConversation();
    const {deleteConversation} = useDeleteConversation();

    const handleUnfriend = async (friendId) => {
      const isAlreadyConversation = conversations.find(friend => friend._id === friendId); 
      await unfriend(friendId);
      if(isAlreadyConversation) {
        await deleteConversation(friendId);
      }
      setSelectedConversation("New Chat")
    }
  return (
    <>
      <div className="btn btn-sm btn-primary" onClick={()=>document.getElementById('unfriend1').showModal()}>Unfriend</div>
        <dialog id="unfriend1" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4 ">Are you sure to unfriend this user ? </p>
                <form method='dialog' className='flex justify-center gap-2'>
                    <button className='btn'>No</button>
                    <button className='btn btn-primary' onClick={() =>(loading ? null : handleUnfriend(friendId))}>Yes</button>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default Unfriend
