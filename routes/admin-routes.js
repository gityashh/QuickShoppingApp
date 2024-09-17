const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Admin} = require('../models/adminSchema')
const isAdmin = require('../middlewares/admin-middleware')
require("dotenv").config()
const { Product } = require("../models/productSchema");
const { Category } = require("../models/categorySchema");


router.get("/",(req,res)=>{
    res.send('hello')
})

router.get("/login",(req,res)=>{
    res.render("admin_login");
})

router.get("/dashboard",isAdmin,async (req,res)=>{
    let products = await Product.find().countDocuments();
    let categories = await Category.find().countDocuments();
    res.render("admin_dashboard",{products,categories});
})

router.get("/logout",isAdmin,(req,res)=>{
    res.cookie("token","");
    res.redirect("/admin/login");
})

router.post("/login",async (req,res)=>{
    let { email,password } = req.body;
    let admin = await Admin.findOne({email});
    if(!admin) return res.send("this admin is not available");

    let valid = await bcrypt.compare(password, admin.password);
    if(valid){
        let token = jwt.sign({ email: email, admin:admin.admin},process.env.JWT_SECRET);
        res.cookie("token",token);
        res.redirect("/admin/dashboard")
    }
    else{
        res.send("invalid credentials")
    }
})

if (process.env.NODE_ENV === "development") {
    router.get("/create", async (req, res) => {
        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash("admin1", salt);

                let admin = new Admin({
                    name: "Yash Rajput",
                    email: "test@test.com",
                    password: hash,
                    admin: true,
                    role: "admin"
                })
                await admin.save();
                res.send("admin created successfully");
        } catch (error) {
            res.send(error);
        }
    })
}

module.exports = router;