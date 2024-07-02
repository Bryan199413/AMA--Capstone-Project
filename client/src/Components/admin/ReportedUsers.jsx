import React from 'react';
import useGetReportedUsers from '../../hooks/admin/useGetReportedUsers';
import { format } from 'date-fns';

function ReportedUsers() {
  const { loading, reportedUsers } = useGetReportedUsers();
  
  const sortedReportedUsers = reportedUsers?.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return (
    <div>
      {loading ? (<p className='text-center m-auto'>Loading...</p>)
      : (
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
            {sortedReportedUsers?.map((report, index) => (
              <tr key={report?._id}>
                <th>{index + 1}</th>
                <td>{report?.username}</td>
                <td>{report?.reason}</td>
                <td>{format(new Date(report?.timestamp), 'dd/MM/yyyy')}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => document.getElementById(`reported_modal_${report?._id}`).showModal()}
                  >
                    View
                  </button>
                  <dialog id={`reported_modal_${report?._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg pb-4 text-center">Details of Report</h3>
                       <div className="py-2">
                        <span className='font-bold'>Reported by: </span>
                        <p className='inline text-primary'>{report?.reporterUsername}</p>
                       </div>
                       <div className='py-2'>
                        <span className='font-bold'>Reason: </span>
                        <p className='inline text-primary'>{report?.reason}</p>
                       </div>
                       <div className='py-2'>
                        <span className='font-bold'>Date: </span>
                        <p className='inline text-primary'>{format(new Date(report?.timestamp), 'dd/MM/yyyy')}</p>
                       </div>
                     
                      <div className="py-4">
                        <span className='font-bold'>Description: </span>
                        <p className='inline'>{report?.description}</p>
                      </div>
                      <div className="py-4 flex justify-between items-center">
                       <div>
                        <span className='font-bold'>Reported user : </span>
                        <p className='inline text-error'>{report?.username}</p>
                       </div>
                       <button className='btn btn-sm btn-warning'>Ban?</button>
                     </div>
                      <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById(`reported_modal_${report?._id}`).close()}>Close</button>
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

export default ReportedUsers;
