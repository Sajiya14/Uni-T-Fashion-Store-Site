import { useState } from 'react';
import Footer from '../components/Footer'
import CloseEye from '../assets/Profile Images/hidden.png'
import openEye from "../assets/Profile Images/eye.png"
import { useLogin } from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const {login, isLoading: loginLoading} = useLogin()
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      await login ( email, password)
      window.location.reload();
    };

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-white pt-[100px]">
    <div className="bg-white  p-8 w-full max-w-md ">
      <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
      <p className="text-center text-sm text-gray-800 mt-3 mb-6">
          Welcome ! Please login your account 
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1 capitalize">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={isShowPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {isShowPassword ? 
                  <img src={openEye} 
                  alt="search" 
                  className="w-4"/>  
                : 
                  <img src={CloseEye} 
                      alt="search" 
                      className="w-4"/>}
            </button>
          </div>
          
        </div>

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {loginLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account? <a href="/signup" className="text-black font-semibold  hover:underline">Sign Up</a>
      </p>

      <p className="text-center text-sm text-gray-500 mt-3">
          Forgot your password? <a href="/recover-password" className="text-black font-semibold hover:underline">Recover Password</a>
      </p>
    </div>

    
  </div>
  <section className='pt-0'>
    <Footer/>
    </section>
  </div>

  
);
};


export default Login