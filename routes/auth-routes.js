const express = require("express")
const router = express.Router();
const passport = require("passport");

router.get("/google",
    passport.authenticate("google",{scope:["profile","email"]}),
)

router.get("/google/callback",
    passport.authenticate("google",{successRedirect:"/user/products",failureRedirect:"/user/login"}),
)

module.exports = router;