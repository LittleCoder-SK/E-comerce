const express = require('express');
const router = express.Router()
const upload = require('../config/multer.config')
const productModel = require('../models/product.model')
const isLoggedIn = require('../middleware/is.loggedIn')
const userModel = require('../models/user.model')

// crate product
router.post("/create", isLoggedIn, upload.single('image'), async (req, res)=>{
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const image = req.file.buffer;

         let user = await userModel.findOne({ email: req.user.email })
            if(!user){
                req.flash('error', 'User not found');
                return res.status(404).send('User not found');
            }

            console.log(user);
            

        const newProduct = await productModel.create({
            image,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            user: user._id
        });

        req.flash('success', 'Product created successfully');
        res.redirect('/admin');
    } catch (error) {
        req.flash('error', 'Error creating product');
        res.status(500).send('Error creating product');
    }
});

// delete product
router.get("/delete/:id", isLoggedIn, async (req, res)=>{
    try {
        const { id } = req.params;

        await productModel.findByIdAndDelete(id);

        req.flash('success', 'Product deleted successfully');
        res.redirect('/shop/products');
    } catch (error) {
        req.flash('error', 'Error deleting product');
        res.status(500).send('Error deleting product');
    }
});

module.exports = router;