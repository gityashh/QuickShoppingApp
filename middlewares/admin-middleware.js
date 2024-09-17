const jwt = require("jsonwebtoken")

function validateAdmin(req,res,next) {
    try {
        let token = req.cookies.token;
    if(!token) return res.redirect("/admin/login")

    let data = jwt.verify(token,process.env.JWT_SECRET); 
    if (!data.admin) {
        return res.send("not an admin")
    }   
    req.user = data;
    next();
    } catch (error) {
        res.send(error.message);
    }
}


module.exports = validateAdmin;