import React, { useContext, useState } from "react";
import Close from '../assets/Navbar Images/close.png';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/ProductsHook/useProducts";
import { CartContext } from "../Context/CartContext";


const VISIBLE = 4;
const STEP = 2;

const WomanNewArrivals = () => {

  const { products } = useProducts();
  const productsItems = products.filter((item) => item.category === "women-new");

  const { dispatch} = useContext(CartContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  //Carousel navigation
  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev + STEP >= productsItems.length ? 0 : prev + STEP
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev - STEP < 0 ? productsItems.length - VISIBLE : prev - STEP
    );
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setSelectedProduct(null);
  };

  // Format price as Rs. with cents
  const priceFormatter = new Intl.NumberFormat("en-IN",{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatPrice = (amount) => `Rs. ${priceFormatter.format(amount)}`;

  return (
    <div className="">
      <h2 className="font-PoppinsFont text-[24px] text-center font-extrabold mb-3">
        WOMAN NEW ARRIVAL’S
      </h2>
      <button className="border-black border rounded-full px-14 py-1 bg-white 
                        text-black hover:bg-black hover:text-white ml-[675px] mb-12">
        View All
      </button>    

      <div className="p-3 flex items-center space-x-4 w-full justify-center">
          <button
              onClick={prevSlide}
              className="pl-1 mb-16 pr-1 border-2 rounded-lg border-black 
                      hover:bg-black hover:text-white hover:border-white h-[42px]">
              <IoMdArrowBack size={30} />
          </button>
      
          <div className="overflow-hidden flex-1">
              <div 
                  className="flex transition-transform duration-700"
                  style={{ transform: `translateX(-${(currentIndex * 100) / VISIBLE}%)`,}}>
                    
                {productsItems.map((product) => (
                    <div
                        key={product._id}
                        className="text-center h-[650px] overflow-hidden w-1/4 shrink-0 px-4">
                        
                        <div className="relative group overflow-hidden">
                            <img 
                                src={`http://localhost:3000${product.images}`} 
                                alt={product.name} 
                                className="w-full h-[420px] object-cover cursor-pointer" 
                                onClick={() => { navigate(`/product/${product._id}`);}}/>

                            <button
                                onClick={() => handleQuickView(product)}
                                className ="absolute bottom-6 left-[150px] w-[220px] h-[38px] 
                                            transform -translate-x-1/2 bg-black text-white 
                                            text-[12px] px-[50px] py-1 rounded-full opacity-0 
                                            group-hover:opacity-100 transition">
                                            Quick View
                            </button>
                        </div>

                        <div className="mt-5 text-center ">
                            <h2 
                                className="text-[16px] font-bold cursor-pointer hover:underline font-PoppinsFont"
                                onClick={() => { navigate(`/product/${product._id}`);}}>
                                  {product.title}
                              </h2>

                            <p className="text-[16px] font-bold font-PoppinsFont mt-2">
                                  {formatPrice(product.price)}
                            </p>
                                      
                            <div className="mt-8 flex group items-center justify-center gap-3">
                                <div className="relative group">
                                    <div
                                        className="w-9 h-9 border border-gray-800 rounded flex 
                                                  bg-white items-center justify-center">
                                          
                                        <div 
                                            className="w-6 h-6"
                                            style={{ backgroundColor: product.color }}>
                                        </div>
                                    </div>
                                      
                                    <span 
                                        className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                                                  bg-black text-white text-xs px-2 py-1 rounded opacity-0
                                                   group-hover:opacity-100 transition whitespace-nowrap z-10 tooltip">
                                        {product.colorName}
                                    </span>
                                </div>
                            </div>
                                      
                            <div className="mt-4 flex items-center gap-3 justify-center">
                                <div className="text-green-600">
                                    <FaCircle />
                                </div>
                                <p className="text-green-600 text-sm font-medium">
                                    {product.availability}
                                </p>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      
          <button
              onClick={nextSlide}
              className="pl-1 mb-16 pr-1 border-2 rounded-lg border-black hover:bg-black hover:text-white hover:border-white h-[42px]">
                  <IoMdArrowForward size={30} />
          </button>
      </div>

      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" 
             onClick={() => setSelectedProduct(null)}>
          <div className="w-[900px] max-w-6xl bg-white p-6 grid grid-cols-2 gap-2 relative">

            <div className='top-[15px] right-[15px] absolute'>
                <button button type='button'>
                    <img 
                        src={Close}
                        alt="close"
                        onClick={closeQuickView}
                        className="w-5 text-gray-500 hover:text-gray-800"/>
                </button>
            </div>

            <div className="flex justify-center items-center">
              <img 
                  src={selectedProduct.images} 
                  alt={selectedProduct.title} 
                  className="w-full max-w-xs object-contain" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">{selectedProduct.title}</h2>
              <p className="text-green-600 font-medium">{selectedProduct.defaultStockStatus}</p>
              <p className="text-2xl font-bold">{formatPrice(selectedProduct.price)}</p>
              <p className="text-gray-500">{selectedProduct.description}</p>
              <p className="font-medium">Color: <span className="text-gray-700">{selectedProduct.colorName}</span></p>
              <p className="font-medium mb-1">Size: <span className="text-gray-700">M</span></p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button 
                      key={size} 
                      className={`px-4 py-2 border ${size === "M" ? "bg-black text-white" : ""}`}>
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
                <button 
                  className="bg-black w-full text-white px-6 py-2 rounded-full font-semibold"
                  onClick={() => dispatch({ type: "ADD_TO_CART", product: selectedProduct })}>
                  Add to Cart
                </button>
              </div>

              <button
                  className="w-full border border-black text-black py-2 rounded-full font-semibold mt-3"
                  onClick={() => { 
                    closeQuickView(); // close modal
                    navigate(`/product/${selectedProduct._id}`);}}
                  >
                    View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default WomanNewArrivals;
