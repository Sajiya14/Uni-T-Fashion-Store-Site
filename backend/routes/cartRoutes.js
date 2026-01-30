const express = require("express");
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

const router = express.Router();

//helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId});
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
}

router.post ("/", async (req, res) => {
    
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found"});

        let cart = await getCart(userId, guestId);

        const productImage = product.images;

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId && 
                    p.size === size &&
                    p.color === color
            );

            if(productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            }else{
                cart.products.push({
                    productId,
                    title: product.title,
                    images: productImage,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            //calculate totalPrice
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create ({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guestId_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        title: product.title,
                        images: productImage,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart( userId, guestId );
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
})

module.exports = router;