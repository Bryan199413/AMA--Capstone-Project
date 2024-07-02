import React from 'react';
import useGetAllFeedback from '../../hooks/admin/useGetAllFeedback';
import { format } from 'date-fns';

function Feedback() {
  const { loading, feedback } = useGetAllFeedback();
  
  const sortedFeedback = feedback?.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return (
    <div>
      {loading ? (<p className='text-center m-auto'>Loading...</p>)
      :
       (<div className="overflow-x-auto">
       <table className="table">
         <thead>
           <tr>
            <th></th>
             <th>From</th>
             <th>Date</th>
             <th>Details</th>
           </tr>
         </thead>
         <tbody>
           {sortedFeedback?.map((feedback, index) => (
             <tr key={feedback?._id}>
               <th>{index + 1}</th>
               <td>{feedback?.username}</td>
               <td>{format(new Date(feedback?.timestamp), 'dd/MM/yyyy')}</td>
               <td>
                 <button
                   className="btn btn-primary btn-sm"
                   onClick={() => document.getElementById(`feedback_modal_${feedback?._id}`).showModal()}
                 >
                   View
                 </button>
                 <dialog id={`feedback_modal_${feedback?._id}`} className="modal">
                   <div className="modal-box">
                     <h3 className="font-bold text-lg py-4 text-center">Feedback</h3>
                      <div className="py-2">
                       <span className='font-bold'>From : </span>
                       <p className='inline text-primary'>{feedback?.username}</p>  
                      </div>
                      <div className="py-2">
                       <span className='font-bold'>Date : </span>
                       <p className='inline text-primary'>{format(new Date(feedback?.timestamp), 'dd/MM/yyyy')}</p>  
                      </div>
                    
                     <div className="py-4">
                       <span className='font-bold'>Description : </span>
                       <p className='inline'>{feedback?.feedbackText}</p>
                     </div>
                     <div className="modal-action">
                       <button className="btn" onClick={() => document.getElementById(`feedback_modal_${feedback?._id}`).close()}>Close</button>
                     </div>
                   </div>
                 </dialog>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>)}
    </div>
  );
}

export default Feedback;
