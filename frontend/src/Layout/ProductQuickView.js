import React from "react";

const ProductQuickView = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="w-[900px] max-w-6xl bg-white p-6 grid grid-cols-2 md:grid-cols-2 gap-2">
        

        <div className="flex justify-center items-center">
          <img 
                src={product.image} 
                alt={product.title} 
                className="w-full max-w-xs object-contain" />
        </div>

        <div className="space-y-3">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg">
          &times;
        </button>
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-green-600 font-medium">{product.defaultStockStatus}</p>
            <p className="text-2xl font-bold">{product.price}</p>
            <p className="text-gray-500">{product.description}</p>
            <p className="font-medium">Color : <span className="text-gray-700">{product.colorName}</span></p>
            <div className="relative group">
                <div
                    className="w-9 h-9 border border-gray-800 rounded flex 
                    bg-white items-center justify-center">
    
                    <div className="w-6 h-6"
                         style={{ backgroundColor: product.color }}>
                    </div>
                </div>
            </div>
            <p className="font-medium mb-1">Size : <span className="text-gray-700">M</span></p>
            <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                    <button
                        key={size}
                        className={`px-4 py-2 border ${
                        size === "M" ? "bg-black text-white" : "" }`}> 
                        {size}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex border w-fit">
                    <button className="px-4 py-2 text-xl">-</button>
                    <span className="px-4 py-2">1</span>
                    <button className="px-4 py-2 text-xl">+</button>
                </div>
          
                <button className="bg-black w-full text-white px-6 py-2 rounded-full font-semibold">
                    Add to Cart
                </button>
            </div>

            <button className="w-full border border-black text-black py-2 rounded-full font-semibold mt-3">
                View Full Details
            </button>
            
        </div>

        
        
      </div>
    </div>
  );
};

export default ProductQuickView;
