const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login",(req,res)=>{
    res.render("user_login");
})

router.get("/profile",(req,res)=>{
    res.send("user_profile");
})


module.exports = router;