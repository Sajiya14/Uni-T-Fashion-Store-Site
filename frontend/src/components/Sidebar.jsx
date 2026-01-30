import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../Layout/profile";
import Addresses from "../Layout/addresses";
import Orders from "../Layout/orders";
import Wishlists from "../Layout/wishlist";

/*---------------Icons---------------*/

import userWhite from '../assets/Profile Images/user (3).png'
import userBlack from '../assets/Profile Images/user (1).png'
import mapWhite from '../assets/Profile Images/map w.png'
import mapBlack from '../assets/Profile Images/map.png'
import orderWhite from '../assets/Profile Images/order box w.png'
import orderBlack from '../assets/Profile Images/order box b.png'
import wishlistWhite from '../assets/Profile Images/love w.png'
import wishlistBlack from '../assets/Profile Images/love.png'
import Logout from '../assets/Profile Images/logout.png'
import { useLogout } from "../hooks/useLogout";

const TestSidebar = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const navigate = useNavigate();

    const { logout,isLoading } = useLogout()

    const handleLogout = () => {
        logout()
        navigate('/');
        window.localStorage.clear();
        window.location.reload();
    };

    const navItemClass = (tab) =>
        `w-40 block px-4 py-2 text-left rounded-lg transition-all duration-200 ${
        activeTab === tab ? "bg-black text-white font-semibold"  : "text-gray-600 hover:bg-gray-100"
    }`;

        
  return (
    <div className="min-h-screen w-full border-r-2 pt-0 pl-6">
      <div className="pt-6 border-r-2 w-72">
        <nav className="text-sm w-72 h-12.5 border-r-2 text-gray-500">
          <ol className="list-reset flex">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><span className="mx-2">{'>'}</span></li>
            <li><a href="/my-account" className="hover:underline">My account</a></li>
            <li><span className="mx-2">{'>'}</span></li>
            <li className="text-gray-800 capitalize">
              {
                activeTab === 'addresses' ? 'My addresses' :
                activeTab === 'profile' ? 'Profile' :
                activeTab === 'orders' ? 'My orders' :
                activeTab === 'wishlist' ? 'Wishlist' :
                ''
              }
            </li>
          </ol>
        </nav> 
      </div>

      <div className="flex min-h-screen ">

                      {/* Sidebar */}
        <aside className="fixed lg:static pt-4 w-72 border-r-2   pl-10 ">
          <ul className="space-y-2 ">
            <li>
              <NavLink to='profile' 
                  onClick={() => setActiveTab("profile")} 
                  className={`flex gap-4 items-center ${navItemClass("profile")}`}>
                    <img src={activeTab === 'profile' ?  userWhite : userBlack} alt='' className='w-5 h-5 '/>
                      Profile
              </NavLink>
            </li>
            <li>
              <NavLink to='addresses' 
                  onClick={() => setActiveTab("addresses")} 
                  className={`flex gap-4 items-center ${navItemClass("addresses")}`}>
                    <img src={activeTab === 'addresses' ?  mapWhite : mapBlack } alt='' className='w-5 h-5 '/>
                      Addresses
              </NavLink>
            </li>
            <li>
                <NavLink to='orders' 
                    onClick={() => setActiveTab("orders")} 
                    className={`flex gap-4 items-center ${navItemClass("orders")}`}>
                      <img src={activeTab === 'orders' ?  orderWhite : orderBlack } alt='' className='w-5 h-5 '/>
                        My Orders
                </NavLink>
            </li>
            <li>
                <NavLink to='wishlist' 
                    onClick={() => setActiveTab("wishlist")} 
                    className={`flex gap-4 items-center ${navItemClass("wishlist")}`}>
                      <img src={activeTab === 'wishlist' ?  wishlistWhite : wishlistBlack } alt='' className='w-5 h-5 '/>
                        Wishlist
                </NavLink>
            </li>
            <li>
                <button 
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex gap-4 items-center w-40 px-4 py-2 text-left rounded-lg text-red-500 hover:bg-red-50">
                      <img src={Logout} alt='' className='w-5 h-5 '/>
                        Logout
                </button>
            </li>
          </ul>
        </aside>

                        {/* Main Content */}
        <main className="flex-1 pl-8 w-full">
          {activeTab === "profile" && <Profile />}
          {activeTab === "addresses" && <Addresses />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "wishlist" && <Wishlists />}
        </main>
      </div>
    </div>
  );
};

export default TestSidebar;
