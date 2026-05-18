const express = require('express');
const router = express.Router()
const isLoggedIn = require('../middleware/is.loggedIn')
const userModel = require('../models/user.model')

// routers
router.get('/', (req, res) => {
    res.render('index')
})

// login
router.get('/login', (req, res) => {
    res.render('login')
})

// admin login
router.get("/admin", isLoggedIn, (req, res) => {
    let succes = req.flash('success')
    res.render('createProducts', { succes })
})

// my account
router.get('/myaccount', isLoggedIn, (req, res) => {
    res.render('Myaccount')
})



module.exports = router;