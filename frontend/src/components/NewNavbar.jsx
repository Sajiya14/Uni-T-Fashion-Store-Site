import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from '../assets/Navbar Images/Logo.png';
import Cart from "../assets/Navbar Images/shopping-bag.png";
import Search from "../assets/Navbar Images/search - white.png";
import { useUserData } from "../hooks/useUserData";
import CartDrawer from '../Layout/CartDrawer';
import { CartContext } from '../Context/CartContext';
import { useDrawer } from '../Context/DrawerContext';
import navItems from '../components/navData'

const TestNavbar = () => {
  /*const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);*/

  const { user } = useUserData()
  const { cart } = useContext(CartContext);

  const capitalize = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const { isCartOpen, toggleDrawer } = useDrawer();
          
      
  return (
    <>
      <nav className={`fixed py-0 top-0 w-full z-50 transition-transform duration-300 shadow-md bg-white`}>
        <div className="flex items-center justify-between">

          <div>
            <Link to='/' type='button'>
              <img 
                src={Logo} alt="logo" 
                className="  scroll-ml-6 pl-10 h-12 pr-5"/>
            </Link>
          </div>

                    {/* Dropdown Category */}
          <div className="flex font-PoppinsFont text-sm   px-4 pt-2 ">
            <div className="flex">
              {navItems.map((link, index) => (
                <div key={index.id || index} className="flex px-5 text-left font-PoppinsFont group">
                  <h1 className=" relative capitalize font-bold cursor-pointer py-7 hover:text-red-500" >
                    <Link to={link.link}>
                      {link.name}
                    </Link>
                  </h1>

                      {/* Multi-level dropdown */}
                  {link.submenu && (
                    <div
                      className="absolute rounded-3xl border-2 top-full left-44 w-fit bg-white
                                opacity-0 invisible group-hover:visible hover:block group-hover:opacity-100 
                                transition-all duration-300 ease-out shadow-lg pr-6"
                    >
                      <div className="flex flex-cols-4 pt-5 pb-5">
                        {link.sublinks.map((mysublinks, subIndex) => (
                          <div key={`${link.id}-${mysublinks.id || subIndex}`} className='ml-10'>
                            <h1 className="font-bold font-PoppinsFont text-[13px]">
                              {mysublinks.Head}
                            </h1>
                            <div className='w-full border border-black/30 mt-1'></div>

                            <div className="pt-2 ">
                              {mysublinks.sublink.map((slink, sIndex) => (
                                <li
                                  key={`${mysublinks.id}-${slink.id || sIndex}`}
                                  className="py-1 list-none font-PoppinsFont text-[11px]  hover:underline"
                                >
                                  <Link to={slink.link}>{slink.name}</Link>
                                </li>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className='pr-10'>
                        <img 
                          src={link.image}
                          alt=''
                          className='w-full h-75 ml-10 rounded-3xl'/>
                      </div>
                      </div>
                      
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

          <div className="flex pr-5">
            <div className="relative w-75">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full font-PoppinsFont text-xs border border-[#d6d6d6] bg-[#e7e7e7] rounded-full pl-4 pr-8 py-3 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-black border border-black rounded-full p-2.5 hover:bg-gray-800 transition"
              >
                <img
                  src={Search}
                  alt="search"
                  className="w-3 h-3"
                />
              </button>
            </div>
          </div>


          <div className="flex font-PoppinsFont text-sm  items-center space-x-6 rtl:space-x-reverse pr-16" >
            {user && (
              <Link to="/my-account" type="button" className="flex items-center mb-5 mr-2"> 
                <span className="absolute text-center ml-1.25">
                  Hello,{`${capitalize(user.firstName)}`}
                </span>

                <span className="pt-10 text-center  font-extrabold">
                  My Account
                </span>
              </Link>
            )}
                    
            {!user && (
              <Link to="/Login" type="button" className="flex items-center mb-3 mr-5">
                <span className="absolute text-center font-PrimaryFont">
                  Login/Signup
                </span>

                <span className=" pt-12 text-center font-PrimaryFont font-extrabold">
                  My Account
                </span>
              </Link>
            )}
              
            <span className="text-[35px] font-light mb-1">
              |
            </span>
                                          
            <button 
              type='button' 
              className="w-9 h-9 flex items-center"
              onClick={toggleDrawer}>

              <img 
                src={Cart} 
                alt="cart" 
                className="w-8 mr-2" 
              />
              
              <div 
                className='absolute justify-center pl-px pt-0.75 right-15 top-7 
                rounded-full w-6 h-6 text-[14px] text-center bg-black text-white'>
                {cart.length || 0}             
              </div>

              <span className="font-PoppinsFont text-[16px]">
                Cart
              </span>
            </button>

          </div>

            

        </div>

        
      </nav>

      <div>
        <CartDrawer drawerOpen={isCartOpen} toggleCartDrawer={toggleDrawer}/>
      </div>
    </>
  );
};

export default TestNavbar;