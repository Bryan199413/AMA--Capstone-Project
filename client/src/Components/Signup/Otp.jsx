import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import useVerify from '../../hooks/useVerify'

function Otp({ phoneNumber, Resend, displayOtpForm }) {
    const [otp, setOtp] = useState('');
    const {verify,loading} = useVerify()

    const hundleSubmit = async (e) => { 
      e.preventDefault();
      await verify(phoneNumber,otp)
    }
  return (
    <div className="hero-content w-full">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className='flex flex-col items-center px-[32px] pt-[32px]'>
            <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
            <h1 className='text-2xl mt-2'>OTP Verification</h1>   
          </div>
          <div className='py-5 px-[32px] text-center'> 
            <h1 className='text-xl text-green-300'>{phoneNumber}</h1>
            <span className='text-xs text-gray-500 hover:text-blue-400 cursor-pointer' onClick={() =>  {displayOtpForm(false)}}>change?</span>
          </div>
          <form className="card-body pt-3" onSubmit={hundleSubmit}>
          <p className='text-center text-sm'>The OTP will expire in 5 minutes</p>
            <div className="form-control w-full">
              <OtpInput
                inputType='tel'
                shouldAutoFocus
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{ width: '40px', height: '40px', fontSize: '20px', border: '1px solid #ccc', borderRadius: '5px' }}
                containerStyle={'flex justify-between gap-2 '}
                renderInput={(props) => <input {...props} />}
              />   
            </div>
            <div className="form-control mt-3">
              <button className="text-base-200 btn bg-[#41B8D5] hover:bg-[#58d7f7]" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Continue'}
              </button>
            </div>
            <div className='text-center text-sm '>Didn't get code ? <span className='link link-info' onClick={Resend}>Resend</span></div>            
          </form>
      </div>   
    </div>
 )
}

export default Otp;
    
    
