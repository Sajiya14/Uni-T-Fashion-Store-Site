import React, { useState } from "react"
import Logo from '../assets/Navbar Images/Logo.png';
import Profile from "../assets/Navbar Images/user.png"
import Cart from "../assets/Navbar Images/shopping-bag.png"
import Favorite from "../assets/Navbar Images/love.png"
import Search from "../assets/Navbar Images/search.png"
import NavLinks from "./NavItems"
import { Link } from "react-router-dom";
import ProfileDrawer from '../Layout/ProfileDrawer'


const Navbar = () => {

        /*----------------Profile Icon Activity------------*/

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    return (
                            /*------Header bar with Icons------*/

        <nav className="bg-white relative">
            <div className="flex items-center  font-medium justify-around h-20 ">
                <div>
                    <img src={Logo} alt="logo" className="  scroll-ml-6 pl-10 h-20 pr-5" />
                </div>

                <div className="flex border-2 border-black rounded-3xl overflow-hidden w-96 mx-auto font-[sans-serif] ml-80">
                    <input type="email" placeholder="Search You Want Product..."
                    className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />
        
                    <button type='button' className="flex items-center justify-center px-5 ">
                        <img src={Search} alt="search" className="w-6"/>
                    </button>

                </div>

                <div className="flex items-center space-x-6 rtl:space-x-reverse pr-24" >

                    <button type='button' className="w-9">
                        <img src={Favorite} alt="cart" className="w-9" />
                    </button>

                    <button type='button' className="w-9"
                            onClick={toggleCartDrawer}>
                        <img src={Profile} alt="profile" className="w-8" />
                    </button>

                    <Link to="/Login" type="button" className="flex items-center mb-4 mr-5">
                        <span className="absolute">Login/Signup</span>
                        <span className="pl-1 pt-12 font-bold">My Account</span>
                    </Link>

                    <span className="text-[35px] font-light mb-1">|</span>
                            
                    <button type='button' className="w-7 h-7 flex items-center">
                        <img src={Cart} alt="cart" className="w-9 mr-2" />
                        <span className=" text-[18px]">Cart</span>
                    </button>                      
                </div>
                
                
            </div>
        
            <ProfileDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

            <div className="flex flex-col px-4 py-4 w-full ">
                
                <div className="flex items-center gap-12 justify-center">
                    <NavLinks />
                </div>
            </div>


                
        </nav>
        

        
            
        
    );
}
export default Navbar; 
