const mongoose = require('mongoose')

const productShema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('product', productShema);