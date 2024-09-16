const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login",(req,res)=>{
    res.render("user_login");
})

router.get("/profile",(req,res)=>{
    res.send("user_profile");
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
            res.clearCookie("connect.sid", { path: '/' });
            res.redirect("/login");
        });
    });
});

module.exports = router;