import {  useState } from 'react';
import location2 from '../assets/Profile Images/location 2.png'
import { useAddAddress } from '../hooks/useAddAddress';
import useAddressData from '../hooks/useAddressData';
import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { useDeleteAddress } from '../hooks/useDeleteAddress';



const Addresses = () => {
  const { addAddress } = useAddAddress();
  const { userAddresses, setUserAddresses, fetchAddresses  } = useAddressData();
  const { updateAddress } = useUpdateAddress();
  const { deleteAddress } = useDeleteAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  
  const [formData, setFormData] = useState({ 
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    isDefault: false, 
  });


  const openAddModal = () => {
      setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      zip: '',
      isDefault: false,
    });
      setEditAddress(null);
      setIsModalOpen(true);
  };

  const openEditModal = (address) => {
    setFormData({ ...address });
    setEditAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = async () =>{ 
    setIsModalOpen(false);
    setEditAddress(null);
    await fetchAddresses();
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editAddress) {
      await updateAddress(editAddress._id, formData);
    } else {
      await addAddress(formData);
    }
    await fetchAddresses();

    closeModal();
    //window.location.reload();
  };

  const [deleteModalOpen,setDeleteModalOpen ] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleDelete = async () => {
  if (!addressToDelete) return;

  await deleteAddress(addressToDelete);

  setUserAddresses(prev => prev.filter(addr => addr._id !== addressToDelete));

  setDeleteModalOpen(false);
  setAddressToDelete(null);
};

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  return (
    <div className='ml-10'>
      <div className='flex '>
      <h2 className="text-[40px] font-PoppinsFont font-black text-black mb-6 md:mb-0">
          My Addresses ({userAddresses.length})
      </h2>

      {userAddresses.length > 0 && (
            <button
              onClick={openAddModal}
              className="bg-black text-white ml-[480px] font-PoppinsFont font-bold px-6 rounded-full hover:bg-gray-800 transition"
            >
              Add New Address
            </button>
        )}

      {userAddresses.length === 0 && (
          <div className="flex flex-col mt-16 h-full text-center py-20">
            <img 
                src={location2} 
                alt='location 2' 
                className="w-[60px] ml-16 mb-2"/>
          <p className="text-gray-500 mb-6">No added any addresses yet.</p>

          <button 
              onClick={openAddModal}
              className="bg-black text-white font-PoppinsFont font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition">
                Add New Address
          </button>
        </div>

        )}
    </div>

      <div>
        {userAddresses.map((addr, index) => (
          <div key={addr._id} className="justify-between mr-16 pb-5 border-b-2 pt-5 items-center rounded">
            <h3 className="text-[20px] font-PoppinsFont font-bold text-black mb-6">{addr.isDefault ? 'Default Address' : `Address ${index + 1}`}</h3>
            <div className="flex text-sm pb-1">
              <label className="block w-48  font-LatoFont font-medium capitalize">
                  Full Name<span className="text-red-500">*</span>
              </label>
                  <span>{capitalize(addr.firstName)} {capitalize(addr.lastName)}</span>
            </div>

            <div className="flex text-sm pb-1">
              <label className="block w-48 font-LatoFont font-medium capitalize">
                  Phone Number<span className="text-red-500">*</span>
              </label>
                  <span >{addr.phone}</span>
            </div>

            <div className="flex text-sm pb-1">
              <label className="block w-48 font-LatoFont font-medium capitalize">
                  Address<span className="text-red-500">*</span>
              </label>
                  <span>{capitalize(addr.address1)}, {capitalize(addr.address2)}, {capitalize(addr.city)}</span>
            </div>

            <div className="flex text-sm pb-1">
              <label className="block w-48 font-LatoFont font-medium capitalize">
                  Country<span className="text-red-500">*</span>
              </label>
                  <span>{addr.country}</span>
            </div>

            <div className="flex text-sm pb-1">
              <label className="block w-48 font-LatoFont font-medium capitalize">
                  Zip Code<span className="text-red-500">*</span>
              </label>
                  <span>{addr.zip}</span>
            </div>
            
            <div className="space-x-2">
              <button
                onClick={() => openEditModal(addr)}
                className="mt-6 bg-black text-white px-7 py-1 rounded-full hover:bg-gray-800 transition"
              >
                Edit
              </button>

              <button
                onClick={() => { setAddressToDelete(addr._id);
                                                setDeleteModalOpen(true) }}
                className="mt-6 bg-black text-white px-7 py-1 rounded-full hover:bg-gray-800 transition"
              >
                Delete
              </button>
            </div>
          </div>
           ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
        <div className="bg-white p-8 w-full max-w-lg rounded shadow-lg relative my-8 max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => closeModal()}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
            <h2 className="text-xl font-LatoFont font-medium text-center mb-1">
              {editAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">Please fill in the information below</p>

          <form>
            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border p-2 mb-4 rounded"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border p-2 mb-4 rounded"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Address 1<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address 1"
              className="w-full border p-2 mb-4 rounded"/>
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Address 2<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address 2"
              className="w-full border p-2 mb-4 rounded"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border p-2 mb-4 rounded"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Zip Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip Code"
              className="w-full border p-2 mb-4 rounded"/>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                Country<span className="text-red-500">*</span>
            </label>
            <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
              >
              <option value="">Select your country</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            </div>
          </form>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="isDefault" 
                  checked={formData.isDefault} 
                  onChange={handleChange} 
                  className="mr-2" />
                  Set as default address
              </label>
            </div>

            <div className="mt-4 flex justify-center">
              <button 
                  onClick={handleSubmit} 
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-gray-800 transition"
                  >
                {editAddress ? 'Edit Address' : 'Add New Address'}
              </button>
            </div>
          
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
                  onClick={()=>{handleDelete(); }}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>           
          </div>
        )}
    </div>
  );
}

export default Addresses;
