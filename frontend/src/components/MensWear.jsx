import React, { useEffect, useState } from 'react'
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Close from '../assets/Navbar Images/close.png';
import  {navItems}  from './NewNavbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsHook/useProducts';
import { useAddToCart } from '../hooks/Cart Hook/useAddToCart';
import { useDrawer } from '../Context/DrawerContext';

const MensWear = () => {

  const { products } = useProducts();

  const { addToCart, loading: addingToCart, error: cartError } = useAddToCart();
  const { openDrawer } = useDrawer();
  const menMenu = navItems.find(item => item.name === "MEN");
  const productsItems = products.filter((item) => item.category === "men-new");

  const categories = menMenu?.sublinks || [];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const brands = ["Moose", "Carnage", "Tommy Hilfiger", "Lacoste", "Polo", "Zara"];
  const availability = ["In Stock", "Out Of Stock"];
  const sortOptions = ["Newest", "Best Selling", "Price - Low to High", "Price - High to Low"];
  const itemsOnPage = ["12","24","36","48"];

  const [openCategories, setOpenCategories] = useState({});
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [itemsOnPageOpen, setItemsOnPageOpen] = useState(false);
  const [selectItemsOnPage, setSelectItemsOnPage] = useState(itemsOnPage[0]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
      if (products && products?.sizes?.length > 0 && !selectedSize) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedSize(products.sizes[0]);
      }
    }, [products, selectedSize]);

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Handle Brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((s) => s !== brand)
        : [...prev, brand]
    );
  };

  // Handle Availability selection
  const handleAvailability = (availability) => {
    setSelectedBrand((prev) =>
      prev.includes(availability)
        ? prev.filter((s) => s !== availability)
        : [...prev, availability]
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

  const increaseQty = () => {
    setQuantity ((q) => q + 1);
  }

  const decreaseQty = () => {
    setQuantity ((q) => (q > 1 ? q - 1 : 1));
  }
  
  // Format price as Rs. with cents
  const priceFormatter = new Intl.NumberFormat("en-IN",{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatPrice = (amount) => `Rs. ${priceFormatter.format(amount)}`;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(
      selectedProduct._id, 
      selectedProduct.quantity, 
      selectedSize, 
      selectedProduct.colorName[0],
    {
      title: selectedProduct.title,
      images: selectedProduct.images, // can be array or first image
      price: selectedProduct.price
    });
    
    openDrawer();
  };
  
  return (
    <div>
    <div className='pl-8 pt-36 grid grid-cols-4 gap-6'>
        <div className='col-span-1'>
        <div className='text-lg'>
            <h2 className='font-Lato text-lg font-bold'>CATEGORIES </h2>
            <div className="w-64 pt-4 ">
                {categories.map((category) => (
                    <div key={category.id} className="mb-3">
                        <div className="flex items-center justify-between text-black hover:text-red-500">
                            <a href='/' className="font-lato text-base ">{category.Head}</a>
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className=" text-gray-600 hover:text-black focus:outline-none">
                                    
                                {openCategories[category.id] ? 
                                    <FaAngleUp /> : <FaAngleDown />
                                }
                            </button>
                        </div>
                        
                        {openCategories[category.id] && (
                            <ul className=" ml-4 mt-2 space-y-1 font-lato text-[14px]">
                                {category.sublink.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={item.link}
                                            className="text-black hover:text-red-500">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
            
            {/*Size Section*/}
        <div className='pt-5 flex-1'>
            <h2 className='font-Lato text-lg font-bold pb-4'>SIZE</h2>
            <ul className="space-y-2 w-16">
            {sizes.map((size) => (
              <li key={size}>
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleSizeChange(size)}>

                    {selectedSizes.includes(size) ? (
                        <MdCheckBox
                            className="text-black w-6 h-6 "/>
                        ) : (
                        <MdCheckBoxOutlineBlank 
                            className="text-black w-6 h-6 "/>
                    )}
                    <span className='text-lg font-Lato'>{size}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

                {/*Brand Section*/}
        <div className='pt-5 flex-1'>
            <h2 className='font-Lato text-lg font-bold pb-4'>BRANDS</h2>
            <ul className="space-y-2 w-40">
            {brands.map((brand) => (
              <li key={brand}>
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleBrandChange(brand)}>

                    {selectedBrand.includes(brand) ? (
                        <MdCheckBox
                            className="text-black w-6 h-6 "/>
                        ) : (
                        <MdCheckBoxOutlineBlank 
                            className="text-black w-6 h-6 "/>
                    )}
                    <span className='text-lg font-Lato'>{brand}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

                {/*Availability Section*/}
        <div className='pt-5 flex-1'>
            <h2 className='font-Lato text-lg font-bold pb-4'>AVAILABILITY</h2>
            <ul className="space-y-2 w-40">
            {availability.map((stock) => (
              <li key={stock}>
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleAvailability(stock)}>

                    {selectedBrand.includes(stock) ? (
                        <MdCheckBox
                            className="text-black w-6 h-6 "/>
                        ) : (
                        <MdCheckBoxOutlineBlank 
                            className="text-black w-6 h-6 "/>
                    )}
                    <span className='text-lg font-Lato'>{stock}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>

              {/*Shot by filter section*/}
          <div className="col-span-3">
            <h1 className='text-2xl font-PoppinsFont font-extrabold'>MEN'S WEAR</h1>

              <div className="flex gap-157.5">
          {/* Sort By Dropdown */}
          <div className="flex pt-6 items-center gap-2">
            <h3 className="text-xs font-PoppinsFont">SORT BY :</h3>
            <div className="relative w-48">
                <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="w-40 flex font-PoppinsFont text-xs justify-between items-center p-2">
                        {selectedSort}
                    <span>{sortOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                </button>
                <div className={`dropdown-menu ${sortOpen ? "open" : ""}`}>
                  {sortOptions.map((option, index) => (
                      <div
                          key={index}
                          onClick={() => {
                            setSelectedSort(option);
                            setSortOpen(false);
                          }}
                          className="p-2 font-PoppinsFont text-xs hover:bg-gray-100 cursor-pointer">
                          {option}
                      </div>
                  ))}
                </div>
              </div>
            </div>

          <div className="flex items-center gap-2">
            <h3 className="text-xs font-PoppinsFont">ITEM ON PAGE :</h3>
            <div className="relative w-16 text-center">
                <button
                    onClick={() => setItemsOnPageOpen(!itemsOnPageOpen)}
                    className="w-16 flex font-PoppinsFont text-xs justify-between items-center p-2">
                        {selectItemsOnPage}
                    <span>{itemsOnPageOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                </button>
                <div className={`dropdown-menu ${itemsOnPageOpen ? "open" : ""}`}>
                  {itemsOnPage.map((items, index) => (
                      <div
                          key={index}
                          onClick={() => {
                            setSelectItemsOnPage(items);
                            setItemsOnPageOpen(false);
                          }}
                          className="p-2 font-PoppinsFont text-xs hover:bg-gray-100 cursor-pointer">
                          {items}
                      </div>
                  ))}
                </div>
              </div>
          </div>
        </div>

            <div className='flex-1'>
              <div className="w-250 grid grid-cols-3 gap-14 pb-10 pt-8">
                  {productsItems.slice(0, visibleCount).map(product => (
                      <div key={product._id}>
                          <div className="relative group object-cover">
                            <img 
                                src={`http://localhost:3000${product.images}`} 
                                alt={product.name} 
                                className="w-70 h-105 object-cover cursor-pointer"
                                onClick={() => { navigate(`/product/${product._id}`);}}/>
            
                            <button
                                onClick={() => {
                                  handleQuickView(product);
                                  setSelectedSize(product.sizes[0]);
                                }}
                                className ="absolute bottom-6 left-35 w-55 h-9.5 
                                            transform -translate-x-1/2 bg-black text-white 
                                            text-[12px] px-12.5 py-1 rounded-full opacity-0 
                                            group-hover:opacity-100 transition">
                                      Quick View
                            </button>
                          </div>
            
                          <div className="mt-5 text-center ">
                              <h2 
                                className="text-[16px] font-bold cursor-pointer hover:underline font-PoppinsFont"
                                onClick={() => { navigate(`/product/${product.id}`);}}>
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

            {visibleCount < productsItems.length && (
              <div className='flex ml-75 mt-6 mb-10'>
                  <button
                    onClick={() => setVisibleCount(prev => Math.min(prev + 6, productsItems.length))}
                    className='px-6 py-3 bg-black cursor-pointer text-white w-60 rounded-full hover:bg-slate-800 transition'
                  >
                    Show More
                  </button>
              </div>
            )}

            
        </div>
            
            {isQuickViewOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                      <div className="w-225 max-w-6xl bg-white p-6 grid grid-cols-2 gap-2 relative">
            
                        <div className='top-3.75 right-3.75 absolute'>
                            <button type='button'>
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
            
                          {selectedSize && (
                            <p className="font-medium mb-1 mt-5">
                              Size: 
                              <span className="text-gray-700 ml-1">
                                {selectedSize}
                              </span>
                            </p>
                          )}
            
                          <div className="flex mt-5 gap-2">
                            {selectedProduct.sizes.map((size) => (
                              <button 
                                key={size} 
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border ${selectedSize === size ? "bg-black text-white" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>
                                {size}
                              </button>
                            ))}
                          </div>
            
                          <div className="flex items-center gap-4">
                              <div className="flex mt-2 items-center border w-fit rounded-lg">
                                <button 
                                  className="px-4 py-2 text-xl rounded-l-lg hover:bg-gray-100"
                                  onClick={decreaseQty}> -
                                </button>
            
                                <span className="px-4 py-2">
                                  {quantity}
                                </span>
            
                                <button 
                                  className="px-4 py-2 text-xl rounded-r-lg hover:bg-gray-100"
                                  onClick={increaseQty}>+
                                </button>
                              </div>
            
                            <button 
                              className="bg-black w-full text-white px-3 py-3 rounded-full font-semibold"
                              onClick={() => {
                                handleAddToCart(); 
                                closeQuickView();
                              }}>
                                {addingToCart ? "Adding..." : "Add to Cart"}
                            </button>
                              {cartError && <p className="text-red-600 mt-2">{cartError}</p>}
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
        <Footer/>
    </div>
    
  )
}

export default MensWear