import React from 'react'

function BannedUsers() {
  return (
    <div>
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
              
                <tr >
                  <th>1</th>
                  <td>username</td>
                  <td>reason</td>
                  <td>29/2/2024</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        document.getElementById(`banned_modal`).showModal();
                      }}
                    >
                      View
                    </button>
                    <dialog id={`banned_modal`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg pb-4 text-center">Details of Banned</h3>
                        <div className="py-2">
                          <span className='font-bold'>Reported by: </span>
                          <p className='inline text-primary'>reported</p>
                        </div>
                        <div className='py-2'>
                          <span className='font-bold'>Reason: </span>
                          <p className='inline text-primary'>reason here</p>
                        </div>
                        <div className='py-2'>
                          <span className='font-bold'>Date: </span>
                          <p className='inline text-primary'>date here</p>
                        </div>
                        <div className="py-4">
                          <span className='font-bold'>Description: </span>
                          <p className='inline'>description here</p>
                        </div>
                        <div className="py-4 flex justify-between items-center">
                          <div>
                            <span className='font-bold text-lg'>Banned User: </span>
                            <p className='inline text-error'>usrename here</p>
                          </div>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => document.getElementById(`unban_modal`).showModal()}
                          >
                            Unban?
                          </button>
                          <dialog id={`unban_modal`} className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                              </form>
                              <p className="py-4">Are you sure you want to Unban this user?</p>
                              <form
                                method="dialog"
                                className="flex justify-center gap-2"
                              >
                                <button type="button" className="btn" onClick={() =>  document.getElementById(`unban_modal`).close()}>No</button>
                                <button type="submit" className="btn btn-primary">
                                  Unban
                                </button>
                              </form>
                            </div>
                          </dialog>
                        </div>
                        <div className="modal-action">
                          <button className="btn" onClick={() => document.getElementById(`banned_modal`).close()}>Close</button>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              
            </tbody>
          </table>
        </div>
      
    </div>
  )
}

export default BannedUsers
