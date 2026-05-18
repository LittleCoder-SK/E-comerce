const express = require('express');
const router = express.Router()

const { registerUser, loginUser, logoutUser } = require('../controller/authController')



router.get("/login", (req, res) => {
    res.render('login', { title: 'Login' })
})

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)  

module.exports = router;