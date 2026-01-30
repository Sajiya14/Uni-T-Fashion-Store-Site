import CloseIcon from "../assets/Navbar Images/close.png";
import Cart from "../assets/Navbar Images/shopping-bag.png";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useAddToCart } from "../hooks/Cart Hook/useAddToCart";
import { Link } from "react-router-dom";
import { useDrawer } from "../Context/DrawerContext";

const CartDrawer = () => {
  const { cart, totalPrice, dispatch } = useContext(CartContext);
  const { addToCart, loading } = useAddToCart();
  const { closeDrawer, isCartOpen, cartDrawerRef} = useDrawer();

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
      <div 
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg 
                    ${isCartOpen ? "translate-x-0" : "translate-x-full"}
                    transform transition-transform duration-100 z-50 flex flex-col`}
        ref={cartDrawerRef}> 

            {/* Header */} 

          <div className="flex justify-between items-center px-6 py-4 border-b"> 
            <div> 
              <h2 className='font-PoppinsFont font-bold text-lg'>Shopping Cart</h2>
              <p className='font-PoppinsFont text-sm text-gray-600'>{cart.length} items</p> 
            </div>
            
            <button onClick={closeDrawer}>
              <img src={CloseIcon} alt="Close" className="w-5" />
            </button>
          </div>

        {/* Body */}
        {cart.length === 0 ? (
          <div className="flex flex-col h-full justify-center items-center text-center"> 
            <img 
              src={Cart} 
              alt='Cart' 
              className="w-[60px] mb-2"
            />

            <p className="text-gray-500 mb-6"> Your cart is empty. </p> 
            
            <button className="bg-black text-white font-PoppinsFont font-bold py-2 px-6 rounded-xl hover:bg-gray-800 transition" > 
                Shop Now 
            </button> 
          </div>
        ) : (
          <>
            <div className="flex-grow pl-4 pr-4 overflow-y-auto">
              {cart.map((product) => (
                <div
                  key={product._id || product.productId}
                  className="flex items-start justify-between border-b py-4"
                >
                  <div className="flex items-start">
                    <img
                      src={
                        product.images
                          ? `http://localhost:9000${product.images}`
                          : "/placeholder.jpg"
                      }
                      alt={product.title || "Product"}
                      className="w-16 h-18 object-cover rounded"
                    />
                    <div className="pl-3">
                      <h3 className="font-medium text-xs mb-1">{product.title}</h3>
                      <p className="text-black font-medium text-xs mb-1">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-black text-xs">
                        Size: {product.size} | Color: {product.color}
                      </p>

                      <div className="flex items-center gap-4 mt-2">
                        <button
                          className="px-3 py-2 text-xs rounded-l-lg hover:bg-gray-100"
                          onClick={() => decreaseQty(product)}
                        >
                          -
                        </button>
                        <span className="px-2 py-2 text-xs">{product.quantity}</span>
                        <button
                          className="px-3 py-2 text-xs rounded-r-lg hover:bg-gray-100"
                          onClick={() => increaseQty(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mr-3 cursor-pointer hover:text-red-500">
                    <MdDelete
                      className="w-5 h-5"
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: product._id || product.productId })}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pb-4 border-t-2 ">
              <div className="flex px-10 py-4 text-xl font-bold justify-between items-center">
                <div>Total</div>
                <div>{formatPrice(totalPrice)}</div>
              </div>

              <div className="flex px-7 mt-2 gap-4">
                <Link 
                  to="/cart" 
                  type="button"
                  onClick={closeDrawer}
                  className="bg-black rounded-xl text-white w-40 py-2 pl-12">
                    View Cart
                </Link>
                <Link 
                  to="/checkout"
                  type="button"
                  onClick={closeDrawer}
                  className="bg-black rounded-xl text-white w-40 px-8 py-2 pl-12">Checkout</Link>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <p className="text-white text-lg">Updating Cart...</p>
          </div>
        )}
      </div>
  
  );
};

export default CartDrawer;
