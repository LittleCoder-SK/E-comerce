const mongoose = require('mongoose');
const config = require('config')

// mongoose.connect(`${config.get("MONGODB_URI")}/${config.get("DB_NAME")}`)
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(function () {
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = mongoose.connection;