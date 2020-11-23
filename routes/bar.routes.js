const express = require('express')
const router = express.Router()

const Bar = require("../models/bar.model")

const myKey = process.env.APIKEY

router.get('/', (req, res) => {
    
    Bar
        .find()
        .then(allBars => {
            res.render('bars/bar-list', {bars: allBars, myKey})
        })
        .catch(err => console.log(err))
})

router.get('bars/:id', (req, res) => {
    
    const barId = req.params.id
    Bar.findById(barId)
        .then(bar => res.render('bars/bar-details', { bar, myKey }))
        .catch(err => console.log(err))
})

router.get('/addcom/:id', (req, res) => {
    console.log('holaa')
})
module.exports = router