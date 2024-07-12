import React, { useState } from 'react';
import useGetBannedUsers from '../../hooks/admin/useGetBannedUsers';
import { format } from 'date-fns';
import useUnbanUser from '../../hooks/admin/useUnbanUser';

function BannedUsers() {
    const { loading, bannedUsers } = useGetBannedUsers();
    const { loading: unbanLoading, unbanUser } = useUnbanUser();
    const [selectedUserId, setSelectedUserId] = useState(null);

    const sortedBannedUsers = bannedUsers?.slice().sort((a, b) => new Date(b.bannedAt) - new Date(a.bannedAt));

    const handleUnban = async (userId,bannedModalId,unbanmodalId) => {
         await unbanUser(userId);
      
         const bannedModal = document.getElementById(bannedModalId);
         const unbanModal = document.getElementById(unbanmodalId);

         if(bannedModal) {
           bannedModal.close();
         }
         if(unbanModal) {
           unbanModal.close();
         }

    };

    return (
        <div>
            {loading ? (
                <p className='text-center m-auto'>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Username</th>
                                <th>Reason</th>
                                <th>Date</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBannedUsers?.map((ban, index) => (
                                <tr key={ban?._id}>
                                    <th>{index + 1}</th>
                                    <td>{ban?.username}</td>
                                    <td>{ban?.reason}</td>
                                    <td>{format(new Date(ban?.bannedAt), 'dd/MM/yyyy')}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                setSelectedUserId(ban.userId);
                                                document.getElementById(`banned_modal_${ban?._id}`).showModal();
                                            }}
                                        >
                                            View
                                        </button>
                                        <dialog id={`banned_modal_${ban?._id}`} className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg pb-4 text-center">Details of Banned</h3>
                                                <div className="py-2">
                                                    <span className='font-bold'>Banned by: </span>
                                                    <p className='inline text-primary'>{ban?.bannedBy}</p>
                                                </div>
                                                <div className="py-2">
                                                    <span className='font-bold'>Reported by: </span>
                                                    <p className='inline text-primary'>{ban?.reportedBy}</p>
                                                </div>
                                                <div className='py-2'>
                                                    <span className='font-bold'>Reason: </span>
                                                    <p className='inline text-primary'>{ban?.reason}</p>
                                                </div>
                                                <div className='py-2'>
                                                    <span className='font-bold'>Date: </span>
                                                    <p className='inline text-primary'>{format(new Date(ban?.bannedAt), 'dd/MM/yyyy')}</p>
                                                </div>
                                                <div className="py-4">
                                                    <span className='font-bold'>Description: </span>
                                                    <p className='inline'>{ban?.description}</p>
                                                </div>
                                                <div className="py-4 flex justify-between items-center">
                                                    <div>
                                                        <span className='font-bold text-lg'>Banned User: </span>
                                                        <p className='inline text-error'>{ban?.username}</p>
                                                    </div>
                                                    <button
                            className="btn btn-sm btn-warning"
                            onClick={() => document.getElementById(`unban_modal_${ban?._id}`).showModal()}
                          >
                            Unban?
                          </button>
                          <dialog id={`unban_modal_${ban?._id}`} className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                              </form>
                              <p className="py-4">Are you sure you want to Unban this user?</p>
                              <form
                                method="dialog"
                                className="flex justify-center gap-2"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleUnban(ban?.userId, 
                                  `banned_modal_${ban?._id}`,
                                  `unban_modal_${ban?._id}`);
                                }}
                              >
                                <button type="button" className="btn" onClick={() =>  document.getElementById(`unban_modal_${ban?._id}`).close()}>No</button>
                                <button type="submit" className="btn btn-primary" disabled={unbanLoading}>
                                  {unbanLoading ? 'Banning...' : 'Yes'}
                                </button>
                              </form>
                            </div>
                          </dialog>
                                                </div>
                                                <div className="modal-action">
                                                    <button className="btn" onClick={() => document.getElementById(`banned_modal_${ban?._id}`).close()}>Close</button>
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BannedUsers;
