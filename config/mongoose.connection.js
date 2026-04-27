const mongoose = require('mongoose');
const dbgr = require('debug') ("development:mongoose");

mongoose.connect("mongodb+srv://soluCoder23:Solu2004%40%23@sk-userdata.uzljo4c.mongodb.net/?appName=SK-UserData")
    .then(function () {
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = mongoose.connection;