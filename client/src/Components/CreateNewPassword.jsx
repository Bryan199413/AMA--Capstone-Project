import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useSetNewPassword from '../hooks/useSetNewPassword'


function CreateNewPassword({phoneNumber}) {
    const [inputs,setInputs] = useState({
        newPassword:'',
        confirmPassword:'',
        phoneNumber
      })
    const {loading,setNewPassword} = useSetNewPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await setNewPassword(inputs);
        if(success){
          navigate("/login");
        }
      }
  return (
    <div className="hero-content w-full">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className='flex flex-col items-center px-[32px] pt-[32px] '>
              <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
              <h1 className='text-2xl mt-2'>Set New Password</h1>
            </div>
            <form className="card-body mt-2" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input type="password" className="grow" placeholder='New Password'
                    value={inputs.newPassword}
                    onChange={(e) => setInputs({...inputs, newPassword: e.target.value})}
                  />    
                </label>
              </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder='Confirm Password'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                    />
                  </label>
                </div>
              <div className="form-control mt-6">
                <button type='submit' className="text-base-200 btn bg-[#41B8D5] hover:bg-[#58d7f7]" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : 'Continue'}
                </button>
              </div>  
          </form>
        </div>   
      </div>
  )
}

export default CreateNewPassword
