const express = require('express')
const router = express.Router()
const myKey = process.env.APIKEY

const Bar = require("../models/bar.model")


//Renders page with all bars
router.get('/', (req, res, next) => {

    Bar
        .find({}, { name: 1, image: 1, location: 1 })
        .then(allBars => {
            res.render('bars/bar-list', { bars: allBars, myKey })
        })
        .catch(err => next(err))
})


//Updates bar in the DB with the comment
router.post('/add-comment/:id', (req, res, next) => {

    const user = req.user
    const barId = req.params.id
    const comment = {
        userid: user,
        comment: req.body.comment
    }

    Bar
        .findById(barId)
        .then(bardata => {

            const comments = bardata.comments.concat(comment)

            return Bar
                .findByIdAndUpdate(bardata.id, { comments }, { new: true })
                .populate({
                    path: 'comments',
                    populate: { path: 'userid' }
                })
        })
        .then((bar) => res.redirect(`/bars/${bar.id}`))
        .catch(err => next(err))
})


//Renders page with selected bar info
router.get('/:id', (req, res) => {

    const barId = req.params.id

    Bar
        .findById(barId, { name: 1, description: 1, image: 1, comments: 1, location: 1, owner: 1 })
        .populate({
            path: 'comments',
            populate: { path: 'userid' }
        })
        .then(bar => {
            res.render('bars/bar-details', { bar, myKey, isLogin: req.user != undefined })
        })
        .catch(err => next(err))
})

//Updates bar in the DB with the comment
router.post('/add-comment/:id', (req, res, next) => {

    const user = req.user
    const barId = req.params.id
    const comment = {
        userid: user,
        comment: req.body.comment
    }

    Bar
        .findById(barId)
        .then(bardata => {

            const comments = bardata.comments.concat(comment)

            return Bar
                .findByIdAndUpdate(bardata.id, { comments }, { new: true })
                .populate({
                    path: 'comments',
                    populate: { path: 'userid' }
                })
        })
        .then((bar) => res.redirect(`/bars/${bar.id}`))
        .catch(err => next(err))
}) 

module.exports = router