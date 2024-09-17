const { Router } = require("express");
const router = Router();
const { userLoggedIn } = require("../middlewares/user-middleware");
const {Cart} = require("../models/cartSchema");
const {Product} = require("../models/productSchema");

router.get("/cart/:id", userLoggedIn, async (req, res) => {
})

router.get("/add/:id", userLoggedIn, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.session.passport.user });
        const product = await Product.findById(req.params.id);

        if (!cart) {
            cart = new Cart({
                user: req.session.passport.user,
                products: [product._id],
                totalPrice: Number(product.price)              
            });
            await cart.save();
        }
        else {
            cart.products.push(product._id);
            cart.totalPrice = Number(cart.totalPrice) + Number(product.price);
            await cart.save();
        }
        res.redirect("back");

    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/remove/:id", userLoggedIn, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.session.passport.user });
        const product = await Product.findById(req.params.id);

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        cart.products = cart.products.filter(p => p.toString() !== product._id.toString());
        cart.totalPrice = cart.totalPrice - Number(product.price);
        await cart.save();

        res.redirect("back");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;