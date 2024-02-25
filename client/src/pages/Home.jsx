import React from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex'>
      <div className='hidden md:block w-full h-lvh bg-[#41B8D5]'></div> 

      <div className='block mx-auto md:w-[50%] w-[740px]'>
        <div className='w-full mt-[50px]'>
          <img src={Logo} alt="" className='w-[200px] mx-auto'/>
        </div>
        <h1 className='text-center font-bold text-5xl my-5'>Get started</h1>

        <div className='flex justify-center gap-2 w-full  px-5'>
          <Link to={'/login'} className='text-center shadow-lg bg-[#41B8D5]  w-[200px]  rounded-md py-2  text-xl text-white hover:bg-[#58d7f7]'>Login</Link>
          <Link to={'/signup'} className='text-center shadow-lg bg-[#41B8D5] w-[200px]  rounded-md py-2  text-xl text-white hover:bg-[#58d7f7]'>Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
