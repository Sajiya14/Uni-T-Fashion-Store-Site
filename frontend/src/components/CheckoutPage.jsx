import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FaAngleUp, FaAngleDown, FaPlus  } from "react-icons/fa6";
import Logo from '../assets/Navbar Images/UNI-T Logo Black.png';
import Cart from "../assets/Navbar Images/shopping-bag white.png";
import KokoLogo from '../assets/Checkout Images/koko.png'
import CardPaymentLOgo from '../assets/Checkout Images/card payment.png'
import MintpayLogo from '../assets/Checkout Images/mintpay.png';
import Edit from '../assets/Checkout Images/edit.png';
import Delete from '../assets/Checkout Images/trash.png';
import { useUserData } from "../hooks/useUserData";
import useAddressData from "../hooks/useAddressData";
import { Link } from "react-router-dom";
//import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useAddAddress } from "../hooks/useAddAddress";
import { useUpdateAddress } from "../hooks/useUpdateAddress";
import { useDeleteAddress } from "../hooks/useDeleteAddress";

const CheckoutPage = () => {

  const { cart, totalPrice } = useContext(CartContext);
  const { user } = useUserData();
  const { userAddresses, setUserAddresses, fetchAddresses } = useAddressData();
  const { addAddress } = useAddAddress();
  const { updateAddress } = useUpdateAddress();
    const { deleteAddress } = useDeleteAddress();
  const [ billingAddressOpen, setBillingAddressOpen ] = useState(false);
  const { logout } = useLogout()

  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const handleLogout = () => {
        logout()
        localStorage.clear();
        window.location.reload();
        setShowTooltip(false);
        setLoggedIn(false);
  };
    
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [isModalOpen,setIsModalOpen ] = useState(false);
  const [editAddress, setEditAddress ] = useState(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);

  const  tooltipRef   = useRef(null);
  const  openBillingRef   = useRef(null);
  const  openTooltipRef   = useRef(null);

  // Close tooltip if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target))
        setShowTooltip(false);
      if (openBillingRef.current && !openBillingRef.current.contains(event.target))
        setBillingAddressOpen(false);
      if (openTooltipRef.current && !openTooltipRef.current.contains(event.target))
        setOpenTooltipId(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profile = {
    email: user?.email ?? '',
  };

  const shipping = 350;
  const priceFormatter = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

  const formatPrice = (amount) => `Rs. ${priceFormatter.format(amount)}`; 
  
  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const effectiveSelectedAddr = 
  selectedAddr ?? (userAddresses?.length ? userAddresses[0] : null);


  const [status, setStatus] = useState("");

  const options = [
    { label: "Card Payment", logo: CardPaymentLOgo },
    { label: "Koko: Buy Now Pay Later", logo: KokoLogo },
    { label: "Mintpay | Shop now. Pay later.", logo: MintpayLogo },
    { label: "Cash On Delivery" },
  ];

  const notes = {
    "Card Payment": "We accept VISA / Master / Debit.",
    "Koko: Buy Now Pay Later": "Pay in 3 interest-free installments with Koko.",
    "Mintpay | Shop now. Pay later.": "Pay later with Mintpay, interest-free.",
    "Cash On Delivery": "Pay full amount at your delivery location."
  };

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    if (editAddress) {
      await updateAddress(editAddress._id, newAddress);
    }else {
      await addAddress(newAddress);
    }
    await fetchAddresses();
    setIsModalOpen(false);
    setNewAddress({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    });
  };

  const openEdit = (addr) => {
    setEditAddress(addr);
    setNewAddress({
    firstName: addr.firstName || "",
    lastName: addr.lastName || "",
    phone: addr.phone || "",
    address1: addr.address1 || "",
    address2: addr.address2 || "",
    city: addr.city || "",
    zip: addr.zip || "",
    country: addr.country || "",
    isDefault: !!addr.isDefault,
  });
    setIsModalOpen(true);
  };

  const [deleteModalOpen,setDeleteModalOpen ] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleDelete = async () => {
  if (!addressToDelete) return;

  await deleteAddress(addressToDelete);

  setUserAddresses(prev => prev.filter(addr => addr._id !== addressToDelete));

  setDeleteModalOpen(false);
  setOpenTooltipId(null);
  setAddressToDelete(null);
};





  return (
    <div className="mx-auto">
      <div className="w-full flex  bg-black h-24">
        <div className="pt-2 pl-28">
          <Link to='/' type='button'>
              <img 
                src={Logo} alt="logo" 
                className="w-36 h-20 object-cover"/>
            </Link>
        </div>

        <div className="mt-6 ml-237.5">
          <Link to='/cart' type='button'>
            <img
              src={Cart}
              alt= "Cart"
              className="w-10 h-10 object-cover cursor-pointer"
            />
          </Link>
            
        </div>    
      </div>
    
      <div className="flex flex-col md:flex-row max-w-8xl "> 
        <div className="md:w-1/2 w-full md:p-3 text-xs items-center justify-center h-full border-r"> 
            {loggedIn ? (
              <div className="bg-[#e7e7e7] mb-5 p-6 rounded-lg shadow">
                <h2 className="text-xl font-PoppinsFont font-extrabold mb-4">Contact</h2>

                <div 
                  className="flex items-center justify-between w-full font-PoppinsFont 
                             text-sm px-0 py-0 border border-gray-300 rounded-lg shadow-sm 
                             bg-white hover:border-black transition-all duration-200">
                  <span className="font-PoppinsFont py-4 px-4 text-[1rem]">{profile.email}</span>

                    <div className="mt-2 flex group items-center justify-center gap-0">
                      <div className="relative group pr-3" ref={tooltipRef} >
                        <BsThreeDotsVertical
                          onClick={() => setShowTooltip((prev) => !prev)}
                          size={18}
                          className="cursor-pointer"
                        />
                        {showTooltip && (
                          <div
                            className="absolute left-1/3 -translate-x-1/2 mt-2 px-5 whitespace-nowrap
                                      py-3 bg-white text-black text-sm border border-gray-300
                                      hover:border-black transition-all duration-200 rounded-lg shadow z-10
                                      cursor-pointer hover:text-red-600"
                            onClick={handleLogout}
                          >
                            Sign Out
                            <div className="absolute left-1/2 -translate-x-1/2 checkOutTooltip"></div>
                          </div>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#e7e7e7] mb-5 p-6 rounded-lg shadow">
                <div className="flex justify-between ">
                  <h2 className="text-xl font-PoppinsFont font-extrabold mb-4">Contact</h2>
                  <div className="relative font-bold underline cursor-pointer text-sm text-slate-900 hover:text-black mr-2">
                    Signin
                  </div>
                </div>

                <div 
                  className="flex items-center justify-between w-full font-PoppinsFont 
                             text-sm px-0 py-0 border border-gray-300 rounded-lg shadow-sm 
                             bg-white hover:border-black transition-all duration-200">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />

                </div>
              </div>
              
            )}
          
          { loggedIn ? (
            <div className="bg-[#e7e7e7] p-6 mb-5 rounded-lg shadow  border-black">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-PoppinsFont font-extrabold" >
                  Billing Details
                </h2>
                <button
                  onClick={() => setBillingAddressOpen(!billingAddressOpen)}
                  className="p-1  rounded-lg bg-white border hover:bg-gray-200 hover:border-black transition"
                  
                >
                  {billingAddressOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
                </button>
              </div>

              <div ref={openBillingRef} className="relative w-full" >
                <div className="w-full flex flex-col font-PoppinsFont text-sm px-4 py-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:border-black transition-all duration-200">
                  {selectedAddr ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold text-black">
                          {selectedAddr.isDefault
                            ? "Default Address"
                            : `Address ${
                                userAddresses.findIndex(
                                  (a) => a._id === selectedAddr._id
                                ) + 1
                              }`}
                        </div>
                      </div>

                      <div className="flex flex-wrap text-black text-sm leading-relaxed">
                        <span>
                          {capitalize(selectedAddr.firstName)}{" "}
                          {capitalize(selectedAddr.lastName)},
                        </span>
                        <span className="ml-1">
                          {capitalize(selectedAddr.address1)},{" "}
                          {capitalize(selectedAddr.address2)},{" "}
                          {capitalize(selectedAddr.city)},
                        </span>
                        <span className="ml-1">{selectedAddr.zip},</span>
                        <span className="ml-1">{capitalize(selectedAddr.country)},</span>
                        <span className="ml-1">{selectedAddr.phone}</span>
                      </div>
                    </>
                  ) : (

                    <span className="text-gray-600 text-sm">No Addresses. Let's Add Your Address</span>
                  )}
                </div>

                {billingAddressOpen && (
                  <div className="absolute mt-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-72 overflow-y-auto">
                    {effectiveSelectedAddr.map((addr, index) => {
                        const isSelected = selectedAddr._id === addr._id;
                          return (
                              <div
                                key={addr._id}
                                onClick={() => {
                                  setSelectedAddr(addr);
                                  setBillingAddressOpen(false);
                                }}
                                className={`p-3 text-sm font-PoppinsFont cursor-pointer border-b last:border-none ${
                                      isSelected
                                        ? "bg-gray-100 border-l-4 border-black"
                                        : "hover:bg-gray-100" }`}>

                                <div className={`font-semibold ${isSelected ? "text-black" : "text-gray-800"}`}>
                                  {addr.isDefault
                                    ? "Default Address"
                                    : `Address ${index + 1}`
                                  }
                                </div>
                          
                                <div className="flex justify-between pb-1">
                                  <div className="text-gray-600 relative text-xs">
                                    {capitalize(addr.firstName)} {capitalize(addr.lastName)},{" "}
                                    {capitalize(addr.address1)},{" "}
                                    {capitalize(addr.address2)},{" "}
                                    {capitalize(addr.city)},{" "}
                                    {addr.zip},{" "}
                                    {capitalize(addr.country)},{" "}
                                    {addr.phone}

                                  </div>

                                  <div className="flex group items-center justify-center gap-0">
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                      <button
                                        type="button"
                                        className="pr-4"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenTooltipId(openTooltipId === addr._id ? null : addr._id);
                                        }}
                                      >
                                        <BsThreeDotsVertical size={18} className="cursor-pointer" />
                                      </button>

                                      {openTooltipId === addr._id && (
                                        <div
                                          className="address-tooltip absolute -left-5.5 -translate-x-1/2 mt-2 px-0 whitespace-nowrap py-0 bg-white text-black text-sm border border-gray-300 rounded-lg shadow z-10"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <div className="absolute right-5.75 -translate-x-1/2 addressTooltip"></div>

                                          <div className="grid">
                                            <div
                                              className="flex rounded-lg pl-3 pr-12 cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openEdit(addr);
                                                setOpenTooltipId(null);
                                              }}
                                            >
                                              <img src={Edit} alt="" className="w-5 h-5 mt-1.75 mr-2" />
                                              <button type="button" className="py-2 text-gray-600 hover:text-black">
                                                Edit
                                              </button>
                                            </div>

                                            <div
                                              className="flex rounded-lg pl-3 pr-12 cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setAddressToDelete(addr._id);
                                                setDeleteModalOpen(true);
                                                setOpenTooltipId(null);
                                              }}
                                            >
                                              <img src={Delete} alt="" className="w-5 h-5 mt-1.75 mr-2" />
                                              <button type="button" className="py-2 text-gray-600 hover:text-red-600">
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>                   
                          );
                    })}
                    <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setBillingAddressOpen(false); 
                          setEditAddress(null);  
                          setNewAddress({
                            firstName: "",
                            lastName: "",
                            phone: "",
                            address1: "",
                            address2: "",
                            city: "",
                            zip: "",
                            country: "",
                            isDefault: false,
                          });
                          setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 py-3 text-sm font-PoppinsFont text-black cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-b-xl transition"
                      >
                        <FaPlus size={12} />
                        Add New Address
                      </div>
                  </div>
                )}
              </div>
            </div>
          ):(
            <div className="bg-[#e7e7e7] p-6 mb-5 rounded-lg shadow  border-black">
              <div className="flex items-center mb-4">
                <h2 className="text-xl pb-1 font-PoppinsFont font-extrabold" >
                  Billing Details
                </h2>
                
              </div>
              <div 
                  className="flex items-center justify-between w-full font-PoppinsFont 
                             text-sm pt-2 py-0 border border-gray-300 rounded-lg shadow-sm 
                             bg-white hover:border-black transition-all duration-200">
                <div className="w-full px-6 py-4 max-w-3xl mx-auto text-sm font-PoppinsFont">

                  <label className="block mb-2 font-bold">Country/region</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:border-black"
                  >
                    <option value="">Select Your Country</option>
                    <option value="sri-lanka">Sri Lanka</option>
                    <option value="india">India</option>
                    <option value="usa">United States</option>
                  </select>

                  <label className="block mb-2 font-bold">Contact Details</label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:border-black"
                  />

                  <label className="block mb-2 font-bold">Address</label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Address 1"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Address 2"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Zip code"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#e7e7e7] mb-5 p-6 rounded-lg shadow">
            <h2 className=" text-xl font-PoppinsFont font-extrabold mb-4">Shipping Method</h2>
            <div className="flex items-center justify-between w-full font-PoppinsFont 
                            text-sm px-4 py-4 border border-gray-300 rounded-lg shadow-sm
                           bg-white hover:border-black transition-all duration-200">
              
              <span className="font-PoppinsFont text-[1rem]">All Island Delivery (Standard)</span>
              
              <div className="mt-2 flex group items-center justify-center gap-0">
                <div className="relative font-bold  group">
                  {formatPrice(shipping)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#e7e7e7] mb-5 p-6 rounded-lg shadow">
            <h2 className=" text-xl font-PoppinsFont font-extrabold mb-4">Payments</h2>
            <div className="flex items-center justify-between w-full font-PoppinsFont 
                            text-sm px-4 py-4 border border-gray-300 rounded-lg shadow-sm
                           bg-white hover:border-black transition-all duration-200">

              <div className="flex flex-col gap-3">
                <div className="flex text-[1rem] flex-col gap-4">
                  {options.map((opt) => (
                    <div key={opt.label} className="flex flex-col">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value={opt.label}
                          checked={status === opt.label}
                          onChange={() => setStatus(opt.label)}
                          className="w-5 h-5"
                        />

                        <span className="pl-1 text-sm">{opt.label}</span>

                        {opt.logo && (
                          <img
                            src={opt.logo}
                            alt={opt.label}
                            className="w-14 h-6 object-contain"
                          />
                        )}
                      </label>

                      {status === opt.label && (
                        <div className="left-14 w-162.5 mt-2 px-5 py-3 bg-black text-white text-xs">
                            {notes[opt.label]}
                          <div className="absolute left-22.5 paymentTooltip"></div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-8 my-8">
            <button className="bg-black text-white text-base rounded-lg px-72.5 py-4">
              Place Order
            </button>
          </div>

        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white p-8 w-full max-w-lg rounded shadow-lg relative my-8 max-h-[90vh] overflow-y-auto">

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-xl font-LatoFont font-medium text-center mb-1">
                {editAddress ? "Edit Address" : "Add New Address"}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                Please fill in the information below
              </p>

              <form onSubmit={handleSaveAddress} className="flex flex-col gap-3 text-sm">
                {[
                  { name: "firstName", type: "text", placeholder: "First Name" },
                  { name: "lastName", type: "text", placeholder: "Last Name" },
                  { name: "phone", type: "text", placeholder: "Phone Number" },
                  { name: "address1", type: "text", placeholder: "Address1" },
                  { name: "address2", type: "text", placeholder: "Address2" },
                  { name: "city", type: "text", placeholder: "City" },
                  { name: "zip", type: "text", placeholder: "Zip Code" },
                ].map(({ name, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm mb-1 capitalize">
                      {placeholder}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={newAddress[name] || ""}
                      onChange={handleChange}
                      className="w-full border rounded p-2 text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm mb-1 capitalize">
                    Country<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={newAddress.country || ""}
                    onChange={handleChange}
                    className="w-full border rounded p-2 text-sm"
                  >
                    <option value="">Select your Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>

                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newAddress.isDefault || false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Set as default address
                </label>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-gray-800 transition"
                >
                  {editAddress ? "Update Address" : "Save New Address"}
                </button>
              </form>

            </div>
          </div>
        )}

        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white items-center justify-center rounded-2xl w-[90%] max-w-sm p-6 shadow-xl">

              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Delete Address?
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete this address?  
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={()=>{handleDelete();
                    window.location.reload();
                  }}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>           
          </div>
        )}
        
        <div className="bg-[#e7e7e7] md:w-1/2 w-full md:h-screen md:sticky md:top-0 flex flex-col">
          <div className="flex-1 mt-8 px-16 pb-6">
            <div 
                  className="grow max-h-75 pt-2 px-10 overflow-y-auto scroll-smooth">
                  {cart.map((product) => (
                    <div
                      key={product._id}
                      className="grid grid-cols-2 pb-4 border-gray-300">
                      <div className="flex">
                        <div className="relative border-2 border-white w-fit h-fit rounded-xl px-2">
                          <img
                            src={
                              product.images
                              ? `http://localhost:9000${product.images}`
                              : "/placeholder.jpg"
                            }
                            alt={product.title || "Product"}
                            className="h-17.5 object-fill"
                          />
                          <div className="absolute -top-2 -right-2 rounded-full w-6 h-6 text-[14px] text-center bg-black text-white flex items-center justify-center">
                              {product.quantity}
                          </div>
                        </div>

                        <div className="pl-3 mt-2">
                          <h3 className="font-medium text-sm">{product.title}</h3>
                          <p className="text-black text-xs mt-1">
                              {product.color} / {product.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end items-center">
                        <p className="text-black text-sm">
                            {formatPrice(product.price * product.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#e7e7e7] border-gray-300 py-10 px-12 sticky">
                  <div className="flex justify-between text-base font-base">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-base font-base">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between text-lg mt-5 font-bold">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice + shipping)}</span>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
