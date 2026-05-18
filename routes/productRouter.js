const express = require('express');
const router = express.Router()
const upload = require('../config/multer.config')
const productModel = require('../models/product.model')

// crate product
router.post("/create", upload.single('image'), async (req, res)=>{
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const image = req.file.buffer;

        const newProduct = await productModel.create({
            image,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash('success', 'Product created successfully');
        res.redirect('/admin');
    } catch (error) {
        req.flash('error', 'Error creating product');
        res.status(500).send('Error creating product');
    }
});

// delete product
router.get("/delete/:id", async (req, res)=>{
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