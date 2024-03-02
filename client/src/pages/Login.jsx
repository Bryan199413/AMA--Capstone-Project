import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
   const [username,setUsername] = useState('');
   const [password,setPassword] = useState('');
   
   const {loading,login} = useLogin();
   
   const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username,password);
	};
  return (
   <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
         <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Hero Section</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>    
         </div>
         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className='flex flex-col items-center px-[32px] pt-[32px]'>
            <h1 className="text-4xl font-black"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span></h1>
            <h1 className='text-2xl mt-2'>Log in</h1>
          </div>
           <form className="card-body pt-2" onSubmit={handleSubmit}>
             <div className="form-control">
                <label htmlFor='username' className="label">
                  <span className="label-text">Username</span>
                </label>
                <input id="username" type="text" placeholder="Username" className="input input-bordered"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value)}}
                />
             </div>
              <div className="form-control">
                <div className="form-control">
                  <label htmlFor='password' className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input id="password" type="password" placeholder="Password" className="input input-bordered"
                   value={password}
                   onChange={(e) => {setPassword(e.target.value)}}
                  />
                  <label className="label">
                   <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="text-base-200 btn bg-[#41B8D5] hover:bg-[#58d7f7]" disabled={loading}>
                  {loading ? <span className="loading loading-spinner]"></span> : "Continue"}
                </button>
              </div>
              <label className="label">
                <p className='text-center '>Don't have an account?
                   <Link to={'/signup'} className='link link-info px-2'>Sign up</Link>
                </p>
              </label>         
            </form>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Login;