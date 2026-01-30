import React, { useState } from 'react';
import Footer from '../components/Footer'
import CloseEye from '../assets/Profile Images/hidden.png'
import openEye from "../assets/Profile Images/eye.png"
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const {signup, isLoading} = useSignup()

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      await signup (firstName, lastName, email, password)
    }

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-white pt-[130px]">
    <div className="bg-white  p-8 w-full max-w-md ">
      <h2 className="text-3xl font-bold text-center text-gray-800">Signup</h2>
      <p className="text-center text-sm text-gray-800 mt-3 mb-6">
          Welcome ! Let's start create your account 
      </p>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Signup
        </button>
        
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <a href="/Login" className="text-black font-semibold  hover:underline">Login</a>
      </p>

    </div>

    
  </div>
  <section className='pt-0'>
    <Footer/>
    </section>
  </div>

  
);
};


export default Signup