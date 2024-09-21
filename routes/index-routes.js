const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.redirect('/user/products')
});


router.get("/map/:orderId",(req,res)=>{
    res.render("map")
});

module.exports = router;