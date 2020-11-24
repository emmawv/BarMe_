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
            res.render('bars/bar-details', { bar, myKey, user})
        })
        .catch(err => console.log(err))
})

router.post('/add-comment/:id', (req, res) => {
    const user = req.user
    const barId = req.params.id

    const comment = {
        userid: user,
        comment: req.body.comment
    }

    console.log(comment)

    Bar
        .findByIdAndUpdate(barId, { comments: comment })
        .populate({
            path: 'comments',
            populate: { path: 'userid' }
        })
        .then(() => {
            res.redirect(`/bars/${barId}`)
        })
        .catch(err => console.log(err))
})


module.exports = router