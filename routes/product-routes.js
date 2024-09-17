const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const { Product, validateProduct } = require("../models/productSchema");
const validateAdmin = require("../middlewares/admin-middleware");
const { Category, validateCategory } = require("../models/categorySchema");

router.get("/",validateAdmin, async (req, res) => {
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

            // Convert _id (category name) into the object key
            const result = {};
            productsByCategory.forEach(categoryGroup => {
                result[categoryGroup._id] = categoryGroup.products;
            });

            res.render("admin_products", { products: result });
        } catch (err) {
            console.error("Error fetching products by category", err);
            res.status(500).send("Internal Server Error");
        }
    };

    await getTopProductsByCategory();
});

router.post("/",validateAdmin, upload.single("image"), async (req, res) => {
    try {
        let { name, price, category, stock, description } = req.body;
        let { error } = validateProduct({
            name, price, category, stock, description, image: req.file.buffer
        })
        if (error) return res.send(error.message);
        let categorycheck = await Category.findOne({name:category});
        if (!categorycheck) {
            let {error} = validateCategory({name:category});
            if(error) return res.send(error.message);
            categorycheck = await Category.create({name:category});
        };
        let product = new Product({
            name, price, category:category, categoryRef:categorycheck._id, stock, description, image: req.file.buffer
        })
        await product.save();
        res.redirect("back");
    } catch (error) {
        res.send(error.message);
    }
});

router.get("/delete/:id",validateAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;