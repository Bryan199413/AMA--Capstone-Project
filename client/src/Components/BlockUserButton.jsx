import React from 'react'
import useBlockUser from '../hooks/useBlockUser'
import useMatching from '../zustand/useMatching';
import useDeleteRoom from '../hooks/useDeleteRoom';

function BlockUserButton() {
    const {receiverProfile} = useMatching();
    const {deleteRoom} = useDeleteRoom();
    const userId = receiverProfile?._id;
    
    const {blockUser,loading} = useBlockUser();

    const handleBlockUser = async (userId) => {
       await blockUser(userId);
        deleteRoom();
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
                    <button className='btn btn-primary' onClick={() =>(loading ? null : handleBlockUser(userId))}>Yes</button>
                </form>
            </div>
        </dialog>
    </>
)
    
}

export default BlockUserButton
