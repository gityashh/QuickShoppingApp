const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Product } = require("../models/productSchema");
const {userLoggedIn} = require("../middlewares/user-middleware");
const { Cart } = require("../models/cartSchema");
router.get("/products",userLoggedIn,async (req,res)=>{
    const getTopProductsByCategory = async () => {
        try {
            const productsByCategory = await Product.aggregate([
                {
                    // Group by category field
                    $group: {
                        _id: "$category",  // Group by category (field in the Product model)
                        products: { $push: "$$ROOT" }  // Push all products into an array
                    }
                },
                {
                    // Limit to 10 products per category
                    $project: {
                        _id: 1,  // Keep the _id field (category)
                        products: { $slice: ["$products", 10] }  // Limit to first 10 products
                    }
                }
            ]);
            
            let somethingInCart = false;
            const cart = await Cart.findOne({ user: req.session.passport.user });
            if(cart && cart.products.length > 0){
                somethingInCart = true;
            }

            const randomProducts = await Product.aggregate([
                { $sample: { size: 3 } }
            ]);

            // Convert _id (category name) into the object key
            const result = {};
            productsByCategory.forEach(categoryGroup => {
                result[categoryGroup._id] = categoryGroup.products;
            });

            res.render("index", { products: result, rnproducts: randomProducts, somethingInCart: somethingInCart, cartCount: cart.products.length });
        } catch (err) {
            console.error("Error fetching products by category", err);
            res.status(500).send("Internal Server Error");
        }
    };

    await getTopProductsByCategory();
})

router.get("/login",(req,res)=>{
    res.render("user_login");
})


router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error in logging out");
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error in destroying session");
            }
            res.clearCookie("connect.sid");
            res.redirect("/user/login");
        });
    });
});

module.exports = router;