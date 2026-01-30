import { useState, useEffect } from 'react'
import { useUserData } from '../hooks/useUserData';
import { useUserUpdate } from '../hooks/useUserUpdate';


const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useUserData();
  const { updateUser, isUpdating, error, success } = useUserUpdate();

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    if (user) {
      setProfile({
        ...user,
      });
    }
  }, [user]);

  const openEditModal = () => {
    setFormData(profile);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    if (!error) {
      setProfile(formData);
      closeEditModal();
      window.location.reload();
    }
  };

  return (
    <div className='ml-10'>
      <h2 className="text-[40px] font-PoppinsFont font-black text-black mb-6">My Profile</h2>
      <div className="pb-6 mb-6">
        <h3 className="text-[22px] font-PoppinsFont font-bold text-black mb-6">Personal info</h3>
        <div className="space-y-2 font-LatoFont font-medium text-black text-sm">
          <div className='flex '>
            <label className="block w-48 text-sm font-LatoFont font-medium capitalize">Full Name<span className="text-red-500">*</span></label>
            <span>{capitalize(profile.firstName)} {capitalize(profile.lastName)}</span>
          </div>
          <div className='flex'>
            <label className="block w-48 text-sm font-LatoFont font-medium capitalize">Email Address<span className="text-red-500">*</span></label>
            <span>{profile.email || "-"}</span>
          </div>
        </div>
        <button className="mt-6 bg-black text-white px-7 py-1 rounded-2xl hover:bg-gray-800 transition" onClick={openEditModal}>Edit</button>
      </div>
      <div>
        <h3 className="text-[22px] font-LatoFont font-bold text-black mb-4">Password</h3>
        <button className="border px-4 py-2 rounded-2xl text-sm hover:bg-gray-100 transition">Change Password</button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={closeEditModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
            <h2 className="text-xl font-semibold text-center mb-1">Edit Personal Info</h2>
            <p className="text-xs text-gray-500 text-center mb-6">Please fill in the information below</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'firstName', type: 'text', placeholder: 'First Name' },
                { name: 'lastName', type: 'text', placeholder: 'Last Name' },
              ].map(({ name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm mb-1 capitalize">{placeholder}<span className="text-red-500">*</span></label>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    type={type}
                    className="w-full border rounded p-2 text-sm"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            
              {isUpdating && <p className="text-sm text-gray-500">Updating...</p>}
              {success && <p className="text-sm text-green-600">Profile updated successfully!</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-gray-800 transition">Update Personal Info</button>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Profile;
