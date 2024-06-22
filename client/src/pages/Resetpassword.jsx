import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import useVerifyAccount from '../hooks/useVerifyAccount';
import OtpFormForResetPassword from '../Components/OtpFormForResetPassword';
import CreateNewPassword from '../Components/CreateNewPassword';

function Resetpassword() {
  const [inputs,setInputs] = useState({
    username:'',
    phoneNumber:'63'
  })
  const {loading,verify} = useVerifyAccount();
  const [displayOtpForm, setDisplayOtpForm] = useState(false);
  const [createNewPasswordForm,setCreateNewPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verify(inputs);
    if(success){
      setDisplayOtpForm(true)
    }
  }

  const handlePhoneInputKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
  };    
  return (
    <div className="hero min-h-screen bg-base-200">
      {!displayOtpForm && !createNewPasswordForm &&(
          <div className="hero-content w-full">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
              <div className='flex flex-col items-center px-[32px] pt-[32px] '>
                <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
                <h1 className='text-2xl mt-2 p-2 '>Reset password</h1>
                <p className='p-2 text-sm text-warning'>To reset your password, please enter your username and phone number. We will send you a verification code to verify your account.</p>
              </div>
              <form className="card-body mt-2" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username"
                      value={inputs.username}
                      onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                  </label>
                </div>
                <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Phone number</span>
                </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <PhoneInput country={'in'}
                     value={inputs.phoneNumber}
                     onChange={(phoneNumber) => setInputs({...inputs, phoneNumber:phoneNumber.startsWith("+") ? phoneNumber : "+" + phoneNumber})}
                     onKeyDown={handlePhoneInputKeyPress}     
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
      )}
      {displayOtpForm && !createNewPasswordForm && (
        <OtpFormForResetPassword phoneNumber={inputs.phoneNumber} resend={handleSubmit} setCreateNewPasswordForm={setCreateNewPasswordForm} /> 
      )}
      {createNewPasswordForm && (
        <CreateNewPassword phoneNumber={inputs.phoneNumber}/>
      )}
    </div>
  )
}

export default Resetpassword
