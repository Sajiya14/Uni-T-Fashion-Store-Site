import { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import Cart from "../assets/Navbar Images/shopping-bag.png";
import { IoIosArrowForward } from "react-icons/io";
import { CartContext } from '../Context/CartContext';
import { useAddToCart } from '../hooks/Cart Hook/useAddToCart';
import { Link } from 'react-router-dom';

const CartPage = () => {

    const { cart, totalPrice, dispatch } = useContext(CartContext);
    const { addToCart, loading } = useAddToCart();
    
    const increaseQty = (product) => addToCart(product.productId, 1, product.size, product.color);
    const decreaseQty = (product) => {
        if (product.quantity > 1)
        addToCart(product.productId, -1, product.size, product.color);
    };
    
    const priceFormatter = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formatPrice = (amount) => `Rs. ${priceFormatter.format(amount)}`;  
    
    

  return (
    <div className="w-full min-h-screen pt-40 pl-16 pr-16 py-10 px-8">
        <div className='inline-flex items-center text-base font-base'>
            <span>Home</span> 
            <IoIosArrowForward className="mt-1 ml-1 mr-1"/> 
            <span className="mt-0.5">Cart</span>
        </div>

        <h2 className="font-LatoFont text-[22px] text-left font-extrabold mt-5">
            MY CART
        </h2>

        {cart.length === 0 ? (
            <div className="flex flex-col h-full mt-20 justify-center items-center text-center"> 
                <img 
                    src={Cart} 
                    alt='Cart' 
                    className="w-15 mb-2"
                />

                <p className="text-gray-500 mb-6"> Your cart is empty.</p> 
                  
                <button className="bg-black text-white font-PoppinsFont font-bold py-2 px-6 rounded-xl hover:bg-gray-800 transition" > 
                    Shop Now 
                </button> 
            </div>

            ) : (

            <div className="grid grid-cols-3 flex-col md:flex-row gap-0 ">
                <div className="col-span-2 bg-white p-6 rounded-lg h-fit border mt-10">
                    <div className="grid grid-cols-3 font-semibold text-gray-700 pb-4">
                        <div>PRODUCTS</div>
                        <div className="ml-46.25">QUANTITY</div>
                        <div className="ml-25">TOTAL</div>
                    </div>

                    <div className="grow overflow-y-auto">
                        {cart.map((product) => (
                            <div 
                                key={product._id}
                                className="grid grid-cols-3 items-center py-6 border-t">
                                
                                <div className="flex items-start">
                                    <img
                                        src={
                                        product.images
                                            ? `http://localhost:9000${product.images}`
                                            : "/placeholder.jpg"
                                        }
                                        alt={product.title || "Product"}
                                        className="w-16 h-18 object-cover rounded"/>

                                    <div className="pl-3">
                                        <h3 className="font-medium text-sm ">{product.title}</h3>
                                        <p className="text-black font-base text-sm mt-1">{formatPrice(product.price)}</p>
                                        <p className="text-black text-xs mt-1">Size: {product.size}</p>
                                        <p className="text-black text-xs mt-1">Color: {product.color}</p>
                                    </div>
                                </div>
                            
                                <div className="flex pl-45">
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            className="px-3 rounded-l-lg py-3 text-sm hover:bg-gray-100"
                                            onClick={() => decreaseQty(product)}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2">{product.quantity}</span>
                                        <button
                                            className="px-3 py-3 rounded-r-lg text-sm hover:bg-gray-100"
                                            onClick={() => increaseQty(product)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex pl-25 items-center gap-4">
                                    <p className="text-sm font-medium mr-8">
                                        {formatPrice(product.price * product.quantity)}
                                    </p>
                                    <MdDelete
                                        className="text-gray-600 hover:text-red-500 cursor-pointer"
                                        size={18}
                                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: product._id })}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='pl-8 md:h-screen md:sticky md:top-40'>
                <div className="bg-white px-10 py-7 mt-10  rounded-lg shadow border h-fit">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="mb-4">
                        <label
                        htmlFor="discount"
                        className="text-sm text-gray-600 mb-1 block"
                        >
                        Discount Code
                        </label>
            <div className="flex gap-2">
              <input
                id="discount"
                type="text"
                placeholder="Enter Discount Code"
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-gray-900 text-white px-4 rounded text-sm">
                Apply
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Discount</span>
            <span>Rs 0.00</span>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Taxes and shipping calculated at checkout
          </p>

          <div className="flex justify-between font-medium text-sm mb-6 border-t pt-3">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        
        <div className='mb-8'>
            <Link
            to="/checkout"
            type='button' 
            className="w-full bg-black text-white border py-3 px-35 rounded-full hover:bg-slate-800 transition">
                Checkout
          </Link>
        </div>
          
        <div className=''>
            <Link
            to=""
            type='button' 
            className="w-full bg-white border text-black py-3 px-26.25 rounded-full hover:bg-black hover:text-white transition">
                Continue Shopping
          </Link>
        </div>
        
        </div>
        </div>
            </div>

            
                
            )}

            {loading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <p className="text-white text-lg">Updating Cart...</p>
                </div>
            )}
    </div>
  )
}

export default CartPage;