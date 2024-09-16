const express = require("express");
const router = express.Router();
const validateAdmin = require("../middlewares/admin-middleware");
const {Category,validateCategory} = require("../models/categorySchema");

router.post("/create",validateAdmin,async(req,res)=>{
    let category = await Category.findOne({name:req.body.name});
    if(category) return res.send("Category already exists");
    let {error} = validateCategory({name:req.body.name});
    if(error) return res.send(error.message);
    else{
        let category = await Category.create({name:req.body.name});
        res.redirect("back");
    }
})

module.exports = router;
