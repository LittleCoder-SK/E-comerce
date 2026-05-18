const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')

const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(401).send('you already have an account, please login');
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    })

                    let token = generateToken(user);
                    res.cookie('token', token);
                    return res.redirect('/login')
                }
            })
        })


    } catch (error) {
        console.log(error.message);
        return res.send(error.message)
    }
};


module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email })
        if (!user) return res.status(401).send('email or password incorrect')

        // bcrypt.compare(password, user.password, async function (err, result) {
        //     if (result) {
        //         let token = generateToken(user)
        //         res.cookie('token', token)
        //         return res.redirect('/shop')
        //     } else {
        //         return res.status(400).send('email or password incorrect')
        //     }

        // })

        let result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(401).send('Email or password incorrect');
        }

        let token = generateToken(user);
        res.cookie('token', token);
        return res.redirect('/shop');

    } catch (error) {
        return res.send(error.message)
    }
}


module.exports.logoutUser = (req, res) => {

    try {

        res.clearCookie('token');
        return res.redirect('/login');

    } catch (error) {

        console.log(error.message);
        return res.status(500).send(error.message);
    }
};