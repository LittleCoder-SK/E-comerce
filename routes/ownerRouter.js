const express = require('express');
const router = express.Router()
const ownerModel = require('../models/owner.model')



// console.log(process.env.NODE_ENV = "development");

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(502)
                .send('you have no premission to create a new owner')
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner)

    })
}

router.get("/", (req, res) => {
    res.send('namaste solu')
})



module.exports = router;