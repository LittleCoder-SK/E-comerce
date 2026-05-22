const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const { log } = require('console')
const flash = require('connect-flash')
const expressSession = require('express-session')

require('dotenv').config()

// routers
const ownerRouter = require('./routes/ownerRouter')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const indexRouter = require('./routes/indexRouter')
const shop = require('./routes/shop')


// database connction
const database = require('./config/mongoose.connection')

// setup
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(expressSession({
    secret: process.env.JWT_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use('/', indexRouter)
app.use('/owners', ownerRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/shop', shop)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});