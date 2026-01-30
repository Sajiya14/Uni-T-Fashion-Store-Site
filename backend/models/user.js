const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        //minlength: 6,
    },
    phone: {
        type: String,
        trim: true,
    },
    dob: {
        dd: { type: String },
        mm: { type: String },
        yyyy: { type: String },
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        require: false,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},
{ timestamps: true }
);


//password hash middleware
/*{userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}) }*/

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});




module.exports = mongoose.model('User', userSchema);