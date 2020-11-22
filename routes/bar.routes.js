const express = require('express')
const router = express.Router()

const Bar = require("../models/bar.model")

router.get('/', (req, res) => {
    Bar
        .find()
        .then(allBars => {
            res.render('bars/bar-list', {bars: allBars})
        })
        .catch(err => console.log(err))
})

module.exports = router