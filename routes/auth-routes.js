const express = require("express")
const router = express.Router();
const passport = require("passport");

router.get("/google",
    passport.authenticate("google",{scope:["profile","email"]}),
)

router.get("/google/callback",
    passport.authenticate("google",{successRedirect:"/user/profile",failureRedirect:"/"}),
)

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