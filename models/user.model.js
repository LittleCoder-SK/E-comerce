const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 6,
        trim: true
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        trim: true
    },
    picture: String
});

module.exports = mongoose.model('user', userSchema);