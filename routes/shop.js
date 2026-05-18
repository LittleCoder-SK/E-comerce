const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/is.loggedIn')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')

router.get('/', isLoggedIn, async (req, res) => {
    let error = req.flash('error')
    let products = await productModel.find()

    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart.product");
    res.render('shop', { error: error, products: products })
})

// products
router.get('/products', isLoggedIn, async (req, res) => {
    let products = await productModel.find()
    res.render('products', { products })
})

router.get('/products/search', isLoggedIn, async (req, res) => {
    let query = req.query.query;
    let products = await productModel.find({ name: { $regex: query, $options: 'i' } });
    res.render('products', { products });
});

// cart
router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart.product");

    let subtotal = 0;
    let totalDiscount = 0;

    user.cart = user.cart.filter(item => item.product !== null);
    await user.save();

    user.cart.forEach(item => {
        let price = item.product.price;

        let discount = item.product.discount;

        let discountAmount = (price * discount) / 100;
        let finalPrice = price - discountAmount;

        subtotal += finalPrice * item.quantity;
        totalDiscount += discountAmount * item.quantity;

        // 👇 extra values attach kar do (important for EJS)
        item.finalPrice = finalPrice;
        item.discountAmount = discountAmount;
    });

    const shipping = 20;
    const total = subtotal + shipping;

    res.render('cart', {
        user,
        subtotal,
        totalDiscount,
        shipping,
        total
    });
});
// add to cart
router.post('/addToCart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });

    let item = user.cart.find(i => i.product == req.params.productId);

    if (item) {
        item.quantity += 1;
    } else {
        user.cart.push({
            product: req.params.productId,
            quantity: 1
        });
    }

    await user.save();
    res.redirect('/shop');
});

// remove from cart
router.post('/removeFromCart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });

    user.cart = user.cart.filter(
        i => !i.product.equals(req.params.productId)
    );

    await user.save();
    res.redirect('/shop/cart');
});

module.exports = router
