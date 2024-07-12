import React, { useState } from 'react';
import useGetReportedUsers from '../../hooks/admin/useGetReportedUsers';
import { format } from 'date-fns';
import useBanUser from '../../hooks/admin/useBanUser';
import useGetBreakDownReport from '../../hooks/admin/useGetBreakDownReport';

function ReportedUsers() {
  const { loading, reportedUsers } = useGetReportedUsers();
  const { loading: loadingBan, banUser } = useBanUser();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { loading: loadingBreakDown, breakDown } = useGetBreakDownReport(selectedUserId);

  const handleBanUser = async (userId, reason, description, reportedModalId, banModalId) => {
    await banUser(userId, reason, description);
    const reportedModal = document.getElementById(reportedModalId);
    const banModal = document.getElementById(banModalId);

    if (reportedModal) {
      reportedModal.close();
    }

    if (banModal) {
      banModal.close();
    }
  };

  const sortedReportedUsers = reportedUsers?.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
              {sortedReportedUsers?.map((report, index) => (
                <tr key={report?._id}>
                  <th>{index + 1}</th>
                  <td>{report?.username}</td>
                  <td>{report?.reason}</td>
                  <td>{format(new Date(report?.timestamp), 'dd/MM/yyyy')}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setSelectedUserId(report.userId);
                        document.getElementById(`reported_modal_${report?._id}`).showModal();
                      }}
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
                            <span className='font-bold text-lg'>Reported user: </span>
                            <p className='inline text-error'>{report?.username}</p>
                          </div>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => document.getElementById(`ban_modal_${report?._id}`).showModal()}
                          >
                            Ban?
                          </button>
                          <dialog id={`ban_modal_${report?._id}`} className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                              </form>
                              <p className="py-4">Are you sure you want to ban this user?</p>
                              <form
                                method="dialog"
                                className="flex justify-center gap-2"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleBanUser(
                                    report.userId,
                                    report.reason,
                                    report.description,
                                    `reported_modal_${report?._id}`,
                                    `ban_modal_${report?._id}`
                                  );
                                }}
                              >
                                <button type="button" className="btn" onClick={() =>  document.getElementById(`ban_modal_${report?._id}`).close()}>No</button>
                                <button type="submit" className="btn btn-primary" disabled={loadingBan}>
                                  {loadingBan ? 'Banning...' : 'Yes'}
                                </button>
                              </form>
                            </div>
                          </dialog>
                        </div>
                        <div>
                          <span className='font-bold text-md'>Breakdown by report</span>
                          {loadingBreakDown ? (
                            <p>Loading breakdown...</p>
                          ) : (
                            <div className='py-2 flex flex-col gap-2'>
                              <p>Hate Speech: <span className={breakDown?.hateSpeech > 0 ? 'text-error' : 'text-primary'}>
                                {breakDown?.hateSpeech || 0}
                                </span></p>
                              <p>Harassment or Bullying: <span className={breakDown?.harrasmentOrBullying > 0 ? 'text-error' : 'text-primary'}>
                                {breakDown?.harrasmentOrBullying || 0}
                                </span></p>
                              <p>Spam or Advertising: <span className={breakDown?.spamOrAdvertising > 0 ? 'text-error' : 'text-primary'}>
                                {breakDown?.spamOrAdvertising || 0
                                }</span></p>
                              <p>Privacy Violations: <span className={breakDown?.privacyViolations > 0 ? 'text-error' : 'text-primary'}>
                                {breakDown?.privacyViolations || 0}
                                </span></p>
                              <p>Underage Users: <span className={breakDown?.underageUser > 0 ? 'text-error' : 'text-primary'}>
                                {breakDown?.underageUser || 0}
                                </span></p>
                            </div>
                          )}
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
