import React, { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useGenerateAvatar from '../../hooks/useGenerateAvatar';
import useChangeAvatar from '../../zustand/useChangeAvatar';
import useNewAvatar from '../../hooks/useNewAvatar';

function ChangeAvatar({toggleMenu}) {
    const {authUser} = useAuthContext();
    const {loading,generateAvatar,newAvatar} = useGenerateAvatar();
    const {avatar,setAvatar} = useChangeAvatar();
    const {loadingA,updateAvatar} = useNewAvatar()

    const handleGenerateAvatar = () => {
        generateAvatar();
        setAvatar(newAvatar)
    }
    const handleSaveNewAvatar = async () => {
        await updateAvatar();
        toggleMenu();
    }
    useEffect(() => {
        setAvatar(authUser.avatar);
        if (newAvatar !== undefined && newAvatar !== null) {
            setAvatar(newAvatar);
        }
      }, [authUser.avatar, newAvatar]);
      
  return (
    <>
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box flex flex-col gap-8 justify-center">
        <div method="dialog" className='flex justify-between'>
          <h3 className="font-bold text-lg">Avatar</h3>
          <button type='button' className="btn btn-sm btn-circle btn-ghost" onClick={toggleMenu} >✕</button>
        </div>
        <div className="avatar mx-auto">
            {loading ? (<span className="loading loading-ring w-40"></span>) : 
             <div className="w-40 rounded-full">
               <img src={avatar}/>
             </div>
            }   
        </div>
        <div className='flex flex-col gap-3 w-full'>
            <button type='button' className="btn btn-accent" onClick={loading ? null : handleGenerateAvatar}>Generate</button>
            <button type='button' className="btn btn-primary" 
            disabled={avatar === authUser.avatar ||loadingA ? true : false} 
            onClick={handleSaveNewAvatar}>{loadingA ? (<span className="loading loading-spin"></span>) : 'Save'}</button>
        </div>
      </div>
      <div method="dialog" className="modal-backdrop" onClick={toggleMenu}></div>
    </dialog>
  </>
  )
}

export default ChangeAvatar
