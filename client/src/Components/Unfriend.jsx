import React from 'react'
import useUnfriend from '../hooks/useUnfriend'

function Unfriend({ friendId }) {
    const {loading,unfriend} = useUnfriend();
  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={()=>document.getElementById('unfriend1').showModal()}>Unfriend</button>
        <dialog id="unfriend1" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4 ">Are you sure to unfriend this user ? </p>
                <form method='dialog' className='flex justify-center gap-2'>
                    <button className='btn'>No</button>
                    <button className='btn btn-primary' onClick={() =>(loading ? null : unfriend(friendId))}>Yes</button>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default Unfriend
