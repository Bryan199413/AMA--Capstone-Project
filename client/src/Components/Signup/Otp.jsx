import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import useVerify from '../../hooks/useVerify'

function Otp({ phoneNumber }) {
    const [otp, setOtp] = useState('');
    const {verify,loading} = useVerify()

    const hundleSubmit = async (e) => { 
      e.preventDefault();
      await verify(phoneNumber,otp)
    }
  return (
    <div>
      <div className="hero-content w-full">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className='flex flex-col items-center px-[32px] pt-[32px]'>
              <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
              <h1 className='text-2xl mt-2'>{phoneNumber}</h1>
            </div>
            <form className="card-body mt-2" onSubmit={hundleSubmit}>
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
              <div className="form-control mt-6">
                <button className="text-base-200 btn bg-[#41B8D5] hover:bg-[#58d7f7]" disabled={loading}>
                  {loading ? <span className="loading loading-spinner]"></span> : 'Continue'}
                </button>
              </div>            
            </form>
        </div>   
      </div>
    </div>
  )
}

export default Otp;
