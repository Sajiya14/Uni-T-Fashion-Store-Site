const express = require ('express')
const Addresses = require ('../models/addresses.js')
const requireAuth  = require('../middleware/authMiddleware.js');
//const user = require('../models/user.js');

const router = express.Router();


router.post('/addAddress', requireAuth, async (req, res) => { 
  const{
        firstName,
        lastName,
        phone,
        address1,
        address2,
        city,
        country,
        zip,
        isDefault,

      } = req.body;

    try {
      const userId = req.user.id;

      if (isDefault) {
      await Addresses.updateMany(
        { user: userId , isDefault: true}, 
        { $set: { isDefault: false } }
      );
    }

      const newAddress = new Addresses({
        user: userId,
        firstName,
        lastName,
        phone,
        address1,
        address2,
        city,
        country,
        zip,
        isDefault
      });

      const addNewAddress = await newAddress.save();
      return res.status(201).json(addNewAddress);
      } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).send("Server Error");
      } 
});

router.get('/getAddresses',requireAuth, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not found or unauthorized' });
    }

    const userId = req.user._id; 

    const addresses = await Addresses.find({ user: userId }).sort({ isDefault: -1, createdAt: -1});
    //isDefault: -1 → puts the default address (true) first
    //createdAt: -1 → within non-defaults, newest addresses come first

    res.status(200).json(addresses);

  } catch (error) {
    console.error('Error fetching addresses:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put('/updateAddress/:id', requireAuth, async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address1,
    address2,
    city,
    country,
    zip,
    isDefault 
  } = req.body;

  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    
    if (isDefault) {
      await Addresses.updateMany(
        { user: userId , isDefault: true}, 
        { $set: { isDefault: false } }
      );
    }
    const address = await Addresses.findById(addressId);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this address' });
    }

    address.firstName = firstName || address.firstName;
    address.lastName = lastName || address.lastName;
    address.phone = phone || address.phone;
    address.address1 = address1 || address.address1;
    address.address2 = address2 || address.address2;
    address.city = city || address.city;
    address.country = country || address.country;
    address.zip = zip || address.zip;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await address.save();

    res.json({ message: 'Address updated successfully', address });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error' });
  }

});

router.delete('/deleteAddress/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Addresses.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;