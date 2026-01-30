const dns = require('node:dns').promises;
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require ('express')
const dotenv = require ("dotenv")
const cors = require('cors');
const path = require("path");
const connectDB = require ("./config/db.js")
const userRoutes = require ('./routes/userRoutes.js');
const addressRoutes = require('./routes/addressRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

dotenv.config();

const app = express();



/*const corsOptions = {
    origin: 'http://localhost:9000', // Allow only this URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  };*/

  app.use(express.json());
  app.use(cors({
    origin: process.env.CLIENT_URL}));
  //app.use(cors(corsOptions));



const PORT = process.env.PORT || 3000;

// Connect to MongoDb
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//API Routes
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

