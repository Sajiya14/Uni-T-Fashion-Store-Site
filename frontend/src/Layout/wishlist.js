import React from 'react'
import Wishlist from '../assets/Profile Images/wishlist.png'
import { useNavigate } from 'react-router-dom';

const Wishlists = () => {

  const navigate = useNavigate();
  const handleNavigate = () => navigate('/products');

  return (
    <div>
      {/* Main Content */}
      <div className="flex ml-10">
          <h2 className="text-[40px] font-PoppinsFont font-black text-black mb-6 md:mb-0">Wishlists</h2>
          <div className="flex flex-col ml-52 mt-16 h-full text-center py-20">
            <img 
                src={Wishlist} 
                alt='wishlist' 
                className="w-[60px] ml-10 mb-4"/>
            <p className="text-gray-500 mb-4">No Wishlists yet</p>
            <button
                onClick={handleNavigate} 
                className="bg-black text-white font-PoppinsFont font-bold py-2 px-8 rounded-full hover:bg-gray-800 transition">
                  Shop now
            </button>
          </div>
        </div>
    </div>
  )
}

export default Wishlists