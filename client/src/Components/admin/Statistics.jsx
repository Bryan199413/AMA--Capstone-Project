import React from 'react'
import { HiUsers } from "react-icons/hi";
import { useSocketContext } from '../../context/SocketContext';
import useGetRegisteredUsers from '../../hooks/admin/useGetRegisteredUsers';

function Statistics() {
   const {onlineUsers} = useSocketContext();
   const {loading,registeredUsers} = useGetRegisteredUsers();
  return (
    <div className='max-w-[850px] mx-auto w-full h-full flex justify-center items-center'>
        
        <div className='flex flex-col justify-between items-center h-[480px]'>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <HiUsers size={45}/>
              <p className='text-xl'>Registered users</p>
              <div className="card-actions justify-end">
                  <span className='text-primary font-bold'>{loading ? 'Loading... ' : registeredUsers}</span>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className='w-10 h-10 bg-green-400 rounded-full'></div>
              <p className='text-xl'>Online users</p>
              <div className="card-actions justify-end">
                <span className='text-primary font-bold'>{onlineUsers.length}</span>
              </div>
            </div>
          </div>
        </div>
      
       
    </div>
  )
}

export default Statistics
