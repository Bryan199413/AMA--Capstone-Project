import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import useSignUp from '../../hooks/useSignUp';
import Otp from './Otp'

function SignupForm() {
    const [inputs,setInputs] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'63'
      })
      const {signup,loading} = useSignUp()
      const [displayOtpForm, setDisplayOtpForm] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(inputs);
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
    <>
        {!displayOtpForm ? (
        <div className="hero-content w-full">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className='flex flex-col items-center px-[32px] pt-[32px] '>
              <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
              <h1 className='text-2xl mt-2'>Sign up</h1>
            </div>
            <form className="card-body mt-2" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Create Username"
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username: e.target.value})}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input type="password" className="grow" placeholder='Create Password'
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs, password: e.target.value})}
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
              <div className="form-control">
              <label className="label">
                  <span className="label-text font-bold">Phone number verification</span>
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
              <label className="label">
                <p className='text-center '>Already have an account?
                  <Link to={'/login'} className='link link-info px-2'>Log in</Link>
                </p>
              </label>         
          </form>
        </div>   
      </div>) : (<Otp phoneNumber={inputs.phoneNumber} Resend={handleSubmit} displayOtpForm={setDisplayOtpForm}/>) }
   </>
  )
}

export default SignupForm
