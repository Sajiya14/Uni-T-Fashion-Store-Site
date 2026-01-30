import React from 'react'
import Order from '../assets/Profile Images/order box.png'

const Orders = () => {
  return (
    <div>
      {/* Main Content */}
      <div className="flex ml-10">
          <h2 className="text-[40px] font-PoppinsFont font-black text-black mb-6 md:mb-0">My Orders</h2>
          <div className="flex flex-col ml-36 mt-16 h-full text-center py-20">
            <img 
                            src={Order} 
                            alt='location 2' 
                            className="w-[60px] ml-16 mb-4"/>
            <p className="text-gray-500 mb-4">No orders yet</p>
            <button className="bg-black text-white font-PoppinsFont font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition">
              Make your first order
            </button>
          </div>
        </div>
    </div>
  )
}

export default Orders