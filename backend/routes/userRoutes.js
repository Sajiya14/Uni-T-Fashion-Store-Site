const express = require ('express')
const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const validator = require('validator')
const authMiddleware = require('../middleware/authMiddleware.js')
//const SignUp  = require ('../controller/userController.js');
//const jwt = require('jsonwebtoken');

const router = express.Router();

//router.post('/register', SignUp);
const createToken = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn:'7d'})
}

router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password, } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
          return res.status(400).json({ message: "All fields must be filled" });
        }
    
        if (!validator.isEmail(email)) {
          return res.status(400).json({ message: "Email is not valid" });
        }
    
        if (!validator.isStrongPassword(password)) {
          return res.status(400).json({ message: "Password not strong enough" });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
    
        const token = createToken(newUser._id);
    
        return res.status(201).json({
          message: "Your account has been created successfully.",
          email,
          token
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      } 
});



router.post('/login',async (req, res) => {
    const { email, password } = req.body;

    try {
        if ( !email || !password) {
            return res.status(400).json({ massage: "All fields must be filled"});
        }
        //find the user by email
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({ massage: "Invalid Email"})
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json({massage: "Invalid Password"})
        
        const token = createToken(user._id)
        if (user) return res.status(200).json ({ massage: "Login Successfully", email, token})
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
})

  
router.put('/userUpdate', authMiddleware, async (req, res) => {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      gender, 
      dob
    } = req.body;

    const userId = req.user._id;
          
    try {
      
      const user = await User.findById(userId);   
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.gender = gender || user.gender;
      user.dob = dob || user.dob;

      /*{if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (gender) user.gender = gender;
      if (dob) user.dob = dob;}*/
          
      await user.save();

      return res.json({ message: 'Profile updated successfully', user });

    } catch (err) {
        console.error('Update error:', err);
          return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;