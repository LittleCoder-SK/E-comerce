const mongoose = require('mongoose');
const config = require('config')
// const dbgr = require('debug') ("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/${config.get("DB_NAME")}`)
    .then(function () {
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = mongoose.connection;