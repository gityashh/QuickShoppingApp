const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.redirect('/user/products')
});

router.get("/test",(req,res)=>{
    
})


router.get("/map/",(req,res)=>{
    res.render("map")
});

module.exports = router;