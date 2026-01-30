const express = require("express");
const multer = require("multer");
const Product = require("../models/product.js");
const { route } = require("./userRoutes.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// create product with image
router.post('/addProduct', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      color,
      colorName,
      gender,
      availability,
      isFeatured,
      isPublished,
      productType,
      
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const product = new Product({
      //user: req.user.id,
      title,
      images: `/uploads/${req.file.filename}`,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      color,
      colorName,
      gender,
      availability,
      isFeatured,
      isPublished,
      productType,  // Convert comma-separated string to array
       // Store relative path
      
    });

    const createProduct = await product.save();
    res.status(201).json({ message: 'Product uploaded successfully', createProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading product', error: error.message });
  }
});



// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//single product view
router.get("/:id" , async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({ message: "Product Not Found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//single product update
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      color,
      colorName,
      gender,
      availability,
      isFeatured,
      isPublished,
      productType,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {

      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.color = color || product.color;
      product.colorName = colorName || product.colorName;
      product.gender = gender || product.gender;
      product.availability = availability || product.availability;
      product.isFeatured = 
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = 
        isPublished !== undefined ? isPublished : product.isPublished;
      product.productType = productType || product.productType;

      const updateProduct = await product.save();
      res.status(201).json({ message: 'Product update successfully', updateProduct });
    }else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})

//new arrival product fetch
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
