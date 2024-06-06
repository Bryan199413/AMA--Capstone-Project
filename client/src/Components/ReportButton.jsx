import React, { useState } from 'react';
import useReportUser from '../hooks/useReportUser';

function ReportButton({ userId }) {
    const { loading, reportUser } = useReportUser();
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await reportUser(userId, reason, description);
        document.getElementById('report_modal').close();
        setDescription('');
        setReason('');
    };

    return (
        <>
            <button type='button' className="btn btn-sm btn-error" onClick={() => document.getElementById('report_modal').showModal()}>Report</button>
            <dialog id='report_modal' className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Report!</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='w-full flex flex-col justify-center items-center py-4 gap-4'>
                        <select className="select w-full" value={reason} onChange={(e) => setReason(e.target.value)}>
                            <option value=''>Reason</option>
                            <option value='Hate Speech'>Hate Speech</option>
                            <option value='Harassment or Bullying'>Harassment or Bullying</option>
                            <option value='Spam or Advertising'>Spam or Advertising</option>
                            <option value='Privacy Violations'>Privacy Violations</option>
                            <option value='Underage Users'>Underage Users</option>
                        </select>
                        <textarea className="textarea textarea-md w-full max-h-80 min-h-40 textarea-bordered overflow-y-auto" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <form method='dialog' className='flex justify-center gap-2' onSubmit={handleSubmit}>
                        <button type='submit' className='btn btn-primary' disabled={loading || reason.length === 0 || description.length === 0}>Submit</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default ReportButton;
