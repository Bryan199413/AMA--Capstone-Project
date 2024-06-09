import React, { useState } from 'react'
import useSendFeedback from '../hooks/useSendFeedback'

function FeedbackButton() {
    const {loading,sendFeedback} = useSendFeedback();
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendFeedback(description);
        document.getElementById('feedback_modal').close();
        setDescription('');
    };
  return (
    <>
       <button type='button' className="btn btn-md btn-secondary w-40" onClick={() => document.getElementById('feedback_modal').showModal()}>Feedback?</button>
            <dialog id='feedback_modal' className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Feedback</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='w-full flex flex-col justify-center items-center py-4 gap-4'>
                        <div>How can we improve?</div>
                        <textarea className="textarea textarea-md w-full max-h-80 min-h-40 textarea-bordered overflow-y-auto" placeholder="Description" 
                         value={description} 
                         onChange={(e) => setDescription(e.target.value)}
                         >
                         </textarea>
                    </div>

                    <form method='dialog' className='flex justify-center gap-2' onSubmit={handleSubmit}>
                        <button type='submit' className='btn btn-primary' disabled={loading || description.length === 0}>Send feedback</button>
                    </form>
                </div>
            </dialog>
    </>
  )
}

export default FeedbackButton
