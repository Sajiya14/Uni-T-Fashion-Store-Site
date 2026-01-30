const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    /*{user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },}*/
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand:{
        type: String,
    },
    sizes: {
        type: [String],
        required: true,
        enum:["S", "M", "L",],
    },
    color: {
        type: [String],
        required: true,
    },
    colorName: {
        type: [String],
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum:["Men", "Women", "Unisex"],
    },
    images: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
        enum: ["In Stock", "Out Of Stock"],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    productType: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);


module.exports = mongoose.model("product", productSchema);