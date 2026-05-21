const express = require('express');
const router = express.Router()
const isLoggedIn = require('../middleware/is.loggedIn')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model');
const upload = require('../config/multer.config');

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
router.get('/myaccount', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email })

        // only logged in user's products
        let products = await productModel.find({ user: user._id })

        res.render('Myaccount', { products, user })
    }
    catch (error) {
        req.flash('error', 'Error fetching account details');
        res.status(500).send('Error fetching account details');
    }
})

// edit product
router.get('/myaccount/edit/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        let product = await productModel.findById(id)
        res.render('editProduct', { product })
    } catch (error) {
        req.flash('error', 'Error fetching product details');
        res.status(500).send('Error fetching product details');
    }
});

router.post('/myaccount/edit', isLoggedIn, upload.single('image'), async (req, res) => {
    try {
        const { id, name, price, discount } = req.body;
        const image = req.file.buffer;
        await productModel.findByIdAndUpdate(id, { name, price, discount, image });

        req.flash('success', 'Product updated successfully');
        res.redirect('/myaccount');
    } catch (error) {
        req.flash('error', 'Error updating product');
        res.status(500).send('Error updating product');
    }
});


// delete product
router.get("/myaccount/delete/:id", isLoggedIn, async (req, res)=>{
    try {
        const { id } = req.params;

        await productModel.findByIdAndDelete(id);

        req.flash('success', 'Product deleted successfully');
        res.redirect('/myaccount');
    } catch (error) {
        req.flash('error', 'Error deleting product');
        res.status(500).send('Error deleting product');
    }
});

module.exports = router;