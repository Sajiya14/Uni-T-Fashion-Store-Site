/*const User = require ('../models/user.js')


export const SignUp = (async (res, req) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ massage: "All fields are required"});
        }

        const userAlreadyExits = await user.findOne({ email });
        if (userAlreadyExits) {
            return res.status(400).json({ massage: "User already exists"});}

        const user = new User({ name, email, password })
        await user.save();

    } catch (error) {
        
    }
};
module.exports = SignUp; */



/*const LogIn = (res, req) => {
    res.send("LogIn Route");
};
module.exports = LogIn;



const LogOut = (res, req) => {
    res.send("LogOut Route");
};
module.exports = LogOut; */