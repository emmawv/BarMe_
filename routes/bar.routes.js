const express = require('express')
const router = express.Router()

const Bar = require("../models/bar.model")
const User = require("../models/user.model")

const myKey = process.env.APIKEY

router.get('/', (req, res) => {
    
    Bar
        .find()
        .then(allBars => {
            res.render('bars/bar-list', {bars: allBars, myKey})
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    
    const user = req.user
    const barId = req.params.id
    
    Bar
        .findById(barId)
        .populate({
            path: 'comments',
            populate: { path: 'userid'}
        })
        .then(bar => {
            console.log(req.user)
            res.render('bars/bar-details', { bar, myKey,  isLogin: req.user != undefined})
        })
        .catch(err => console.log(err))
})



module.exports = router