const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require("passport");

const authRouter = require('./routes/auth-routes');
const indexRouter = require('./routes/index-routes');
const adminRouter = require('./routes/admin-routes');
const productRouter = require("./routes/product-routes");
const categoryRouter = require("./routes/category-routes");
const userRouter = require("./routes/user-routes");
const cartRouter = require("./routes/cart-routes");

require("dotenv").config();
require("./config/google-auth-config");
require("./config/mongoose-connection")();

app.set('view engine', 'ejs');  

// Use express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use("/products",productRouter);
app.use("/categories",categoryRouter);
app.use("/user",userRouter);
app.use("/cart",cartRouter);

app.listen(3000);