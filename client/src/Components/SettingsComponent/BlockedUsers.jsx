import React from 'react'
import useGetBlockedUsers from '../../hooks/useGetBlockedUsers'
import useBlockedUsers from '../../zustand/useBlockedUsers';
import useUnBlockUser from '../../hooks/useUnblockUser';

function BlockedUsers() {
   const {loading} =  useGetBlockedUsers();
   const {blockedUsers} =  useBlockedUsers();
   const {loadingUnblock,unBlockUser} = useUnBlockUser();

  return (
    <div className="card-actions" >
       {blockedUsers.slice().reverse().map(user => (
          <div key={user._id} className="flex justify-between items-center w-full">
            <div className="flex items-center py-1 mx-1">
                <div className="avatar">
                <div className="w-9 rounded-full">
                    <img src={user.avatar} alt="Avatar" />
                </div>
                </div>
                <div className="px-2 overflow-ellipsis w-24 overflow-hidden">{user.username}</div>
            </div>
            <div className="btn btn-sm px-0 w-16 btn-error" onClick={()=> (loadingUnblock ? null : unBlockUser(user._id))}>Unblock</div>
          </div> 
        ))}
            
    </div>
  )
  
}

export default BlockedUsers
              



