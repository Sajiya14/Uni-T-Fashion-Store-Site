const mongoose = require ('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address1: {
        type: String,
        require: false,
    },
    address2: {
        type: String,
        require: false,
    },
    city: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        enum: ['Sri Lanka', 'India', 'USA'],
        require: false,
    },
    zip: {
        type: Number,
        require: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },

},
{ timestamps: true }
);

module.exports = mongoose.model("Addresses", addressSchema);