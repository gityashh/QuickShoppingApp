const { Router } = require("express");
const router = Router();
const { userLoggedIn } = require("../middlewares/user-middleware");
const { Cart } = require("../models/cartSchema");
const { Product } = require("../models/productSchema");
const { Address } = require("../models/userModel");
const { User } = require("../models/userModel");
const addressRoutes = require("./address-routes");

router.get("/", userLoggedIn, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.session.passport.user }).populate("products");
        let user = await User.findOne({ _id: req.session.passport.user });

        let defaultAddress = user.defaultAddress;

        let cartData = {};

        cart.products.forEach(product => {
            let key = product._id.toString();
            if (cartData[key]) {
                cartData[key].quantity += 1;
            }
            else {
                cartData[key] = {
                    ...product._doc,
                    quantity: 1
                }
            }
        });

        let finalarray = Object.values(cartData);

        res.render("cart", { cart : finalarray, finalprice:cart.totalPrice ,defaultAddress:defaultAddress});
    } catch (error) {
        res.status(500).send(error.message);
    }
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

        let prodId = cart.products.indexOf(product._id);
        cart.products.splice(prodId, 1);
        cart.totalPrice = Number(cart.totalPrice )- Number(product.price);
        await cart.save();

        res.redirect("back");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.use("/address", addressRoutes);

module.exports = router;