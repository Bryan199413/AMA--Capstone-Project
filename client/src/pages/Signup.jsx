import { useState } from 'react';
import Logo from '../assets/Logo.png';
import { FaRegUser, FaLock } from "react-icons/fa";
import {Link} from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { BsFillTelephonePlusFill } from "react-icons/bs";
import TermsAndConditions from '../Components/TermsAndConditions';


function Signup() {
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);


  return (
      <div>
          <div className='bg-white block mx-auto w-[500px] my-4 rounded-md'>
              <div className='w-full mt-[50px]'>
                  <img src={Logo} alt="" className='w-[150px] mx-auto'/>
              </div>
              <h1 className='text-[40px] text-center py-4'>Create an account</h1>
              <form action="" className='w-full px-20'>
                  <div className={`flex items-center border-b-2 mb-5 ${isUsernameFocused ? 'border-blue-500' : 'border-gray-300'}`}>
                      <input 
                          type="text" 
                          className='w-full py-3 focus:outline-none' 
                          placeholder='Create Username'
                          required
                          onFocus={() => setIsUsernameFocused(true)}
                          onBlur={() => setIsUsernameFocused(false)}
                      />
                      <FaRegUser size={20}/>
                  </div>
                  <div className={`flex items-center border-b-2 my-5 ${isPasswordFocused ? 'border-blue-500' : 'border-gray-300'}`}>
                      <input 
                          type="password" 
                          className='w-full py-3 focus:outline-none' 
                          placeholder='Create Password'
                          required
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                      /> 
                      <FaLock size={20} />
                  </div>

                  <div className={`flex items-center border-b-2 my-5 ${isConfirmPasswordFocused ? 'border-blue-500' : 'border-gray-300'}`}>
                      <input 
                          type="password" 
                          className='w-full py-3 focus:outline-none' 
                          placeholder='Confirm Password'
                          required
                          onFocus={() => setIsConfirmPasswordFocused(true)}
                          onBlur={() => setIsConfirmPasswordFocused(false)}
                      /> 
                      <FaLock size={20} />
                  </div>

                  <div className={`flex items-center border-b-2 my-5 ${isPhoneNumberFocused ? 'border-blue-500' : 'border-gray-300'}`}>
                      <PhoneInput
                      country={"in"}
                      value={'+63'}
                      onFocus={() => setIsPhoneNumberFocused(true)}
                      onBlur={() => setIsPhoneNumberFocused(false)}/>
                      <BsFillTelephonePlusFill size={20} />
                  </div>
                  
                  <button className='bg-[#41B8D5] w-full rounded-md py-2 my-5 text-xl text-white hover:bg-[#58d7f7]'>Signup</button>
              </form>

              <p className='text-center'>Already have an account?<Link to='/login' className='text-[#41B8D5] px-2 hover:text-[#58d7f7]'>Login</Link></p>
          </div>
      </div>
  );
}

export default Signup
