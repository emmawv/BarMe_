const express = require('express')
const router = express.Router()

const Bar = require('../models/bar.model')

// Endpoints
router.get('/bars', (req, res) => {

    Bar
        .find()
        .then(bars => res.json(bars))
        .catch(err => next(err))
})

module.exports = router