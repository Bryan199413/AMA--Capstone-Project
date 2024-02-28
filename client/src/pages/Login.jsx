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
        <div className="hero-content h-screen flex-col lg:flex-row">
         <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold"><span className='text-[#41B8D5]'>Machi</span><span className='text-[#EEC0C2]'>machi</span><span className='text-[#5D4029]'>.</span></h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>    
         </div>
         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
           <form className="card-body" onSubmit={handleSubmit}>
             <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="Username" className="input input-bordered"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value)}}
                />
             </div>
              <div className="form-control">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered"
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
                  {loading ? <span className="loading loading-spinner]"></span> : "Login"}
                </button>
              </div>
              <label className="label">
                <p className='text-center '>Don't have an account?
                   <Link to={'/signup'} className='link link-info px-2'>Signup</Link>
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