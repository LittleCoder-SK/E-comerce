const express = require('express')
const app = express()
const cookieParser = require('cookie-parse')
const path = require('path')
const { log } = require('console')

// routers
const ownerRouter = require('./routes/ownerRouter')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')


// database connction
const database = require('./config/mongoose.connection')


app.set("view engine", "ejs")
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/owners', ownerRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', function(req, res){
    res.send('now im ready')
})

app.listen(3000)