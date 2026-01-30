import React, { useState, useEffect } from 'react'
import CloseIcon from '../assets/Navbar Images/close.png'
import axios from 'axios';
import CloseEye from '../assets/Profile Images/hidden.png'
import openEye from "../assets/Profile Images/eye.png"
import profile from "../assets/Profile Images/user.png"
import orders from "../assets/Profile Images/Orders.png"
import location from "../assets/Profile Images/location.png"
import wishList from "../assets/Profile Images/love.png"
import Logout from "../assets/Profile Images/Logout.png"
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProfileDrawer = ({ drawerOpen, toggleCartDrawer }) => {

        const [state, setState] = useState("Login");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [isShowPassword, setIsShowPassword] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
      
        useEffect(() => {
          const token = localStorage.getItem("token");
          const storedFirstName = localStorage.getItem("firstName");
          const storedLastName = localStorage.getItem("lastName");

          setIsAuthenticated(!!token);
          setFirstName(storedFirstName);
          setLastName(storedLastName || "");
        }, []);
      
        const toggleShowPassword = () => {
          setIsShowPassword(!isShowPassword);
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          
          
            try {
              if (state === "Login") {
                const resp = await axios.post("http://localhost:9000/api/users/login", {
                  email,
                  password,
                });
                console.log(resp);
                localStorage.setItem("token", resp.data.token || "dummy-token");
                localStorage.setItem("firstName", resp.data.firstName || "User");
                localStorage.setItem("lastName", resp.data.lastName || "");

                setFirstName(resp.data.firstName || "User");
                setLastName(resp.data.lastName || "");
                setIsAuthenticated(true);
              } else {
                const resp = await axios.post("http://localhost:9000/api/users/register", { 
                    firstName, 
                    lastName, 
                    email, 
                    password }
                );
                console.log(resp);
                localStorage.setItem("token", resp.data.token || "dummy-token");
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);


                setIsAuthenticated(true);
              }
        
              

                setTimeout(() => {
                setLoading(false);
                toggleCartDrawer(false)
                navigate("/profile")
              }, 4000);
              
            
            
            

            } catch (error) {
              console.error(error);
              setLoading(false);
              
            }
          };
        
          const handleLogout = () => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            toggleCartDrawer(false);
          };

          const getInitials = () => {
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
          };
      

      
    
     

  return (
    <div>
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-[350px] h-full bg-white shadow-lg ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } transform transition-transform duration-200 z-50 flex-col`}
        >
          <div className="flex justify-end p-5 pr-6">
            <button onClick={toggleCartDrawer}>
              <img src={CloseIcon} alt='Close' className='w-5 mt-2'/>
            </button>
          </div>
          {!isAuthenticated ? (
            <div>
              <div>
                <h2 className="text-[40px] font-bold text-center pt-10">
                  {state === "Login" ? "Login" : "SignUp"}
                </h2>
                <p className="text-center text-[12px] pt-2">
                  {state === "Login"
                  ? "Welcome! Please log in to your account."
                  : "Welcome! Let's create your account."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="px-8">
              {state === "SignUp" && (
                <>
                <div>
                  <label className="block pt-5 text-[14px]">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block pt-5 text-[14px]">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </>
              )}


              <div>
                <label className="block pt-5 text-[14px]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block pt-5 text-[14px]">Password</label>
                <div className="flex border rounded-lg overflow-hidden w-full">
                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="p-2"
                    onClick={toggleShowPassword}
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

              {state === "Login" && (
                <p className="underline text-right text-[12px] pt-1 cursor-pointer">
                  Forgot password?
                </p>
              )}

              <button
                type="submit"
                className="bg-black text-white p-2 w-full rounded-lg mt-5"
                disabled={loading}
              >
                {loading ? "Processing..." : state}
              </button>
            </form>

            <div className="text-center text-[12px] pt-3">
              {state === "Login" ? (
                <>
                  <span>Don’t have an account?</span>
                  <span
                    onClick={() => setState("SignUp")}
                    className="font-bold pl-2 cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  <span>Already have an account?</span>
                  <span
                    onClick={() => setState("Login")}
                    className="font-bold pl-2 cursor-pointer"
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">

            <div className="w-20 h-20 mx-auto bg-gray-300 flex items-center justify-center text-xl font-bold rounded-full">
              {getInitials()}
            </div>

            <p className="font-bold text-lg pt-5"> Hi, {firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)} !</p>

            <div className='flex ml-6 pt-8'>
              <img src={profile}
                    alt='profile'
                    className='w-6'/>
              <button className='relative pl-4 text-[17px] hover:text-red-500'> My Profile </button>
            </div>

            <div className='flex ml-6 pt-6'>
              <img src={orders}
                    alt='orders'
                    className='w-6 h-6'/>
              <button className='relative pl-4 text-[17px] hover:text-red-500'> Orders </button>
            </div>

            <div className='flex ml-6 pt-6'>
              <img src={location}
                    alt='location'
                    className='w-6 h-6'/>
              <button className='relative pl-4 text-[17px] hover:text-red-500'> Addresses </button>
            </div>

            <div className='flex ml-6 pt-6'>
              <img src={wishList}
                    alt='wishlist'
                    className='w-6 h-6'/>
              <button className='relative pl-4 text-[17px] hover:text-red-500'> Wish List </button>
            </div>

            <div className='flex ml-6 mt-6'>
              <img src={Logout}
                    alt='logout'
                    className='w-6'/>
              <button 
                      className='relative pl-4 text-[17px] hover:text-red-500' 
                      onClick={handleLogout}> Logout </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
        

           

export default ProfileDrawer
