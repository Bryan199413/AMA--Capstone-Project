import React from 'react'
import { MdOutlineDeleteSweep } from "react-icons/md";
import useDeleteConversation from '../hooks/useDeleteConversation';
import useConversation from '../zustand/useConversation';


function DeleteConversationModal({isSelected,conversationId}) {
    const {loading,deleteConversation} = useDeleteConversation();
    const {setSelectedConversation} = useConversation();
    const handleDeleteConversation = async (conversationId) => {
      await deleteConversation(conversationId);
      setSelectedConversation("New Chat");
    }
  return (
   <>
     <div className={`py-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`} 
       onClick={()=>document.getElementById('DeleteConversation').showModal()}>
       <MdOutlineDeleteSweep size={20}/>
    </div>

    <dialog id="DeleteConversation" className="modal">
    <div className="modal-box">
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <p className="py-4 ">Are you sure you want to delete this conversation?</p>
        <form method='dialog' className='flex justify-center gap-2'>
            <button className='btn'>No</button>
            <button className='btn btn-primary' onClick={() => (loading ? null : handleDeleteConversation(conversationId))}>Yes</button>
        </form>
    </div>
    </dialog>
   </>
  )
}

export default DeleteConversationModal;


