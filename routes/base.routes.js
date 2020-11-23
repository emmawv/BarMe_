const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")
const Bar = require("../models/bar.model")

const bcrypt = require("bcrypt");
const bcryptSalt = 10

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })

router.get('/profile', ensureAuthenticated, (req, res) => {
    if (req.user.role === 'GUEST') {
        res.render('profile/user', { user: req.user })
    } else if (req.user.role === 'BOSS') {
        Bar.find({ owner: req.user.id })
            .then(bars => res.render('profile/owner', { user: req.user, bars: bars }))
            .catch(err => console.log(err))
    }
})

router.get('/edit-bar', ensureAuthenticated, checkRole('BOSS'), (req, res) => { 
    const barId = req.query.id 
    Bar
        .findById(barId)
        .then(bar => {
            if (req.user.id == bar.owner) {
                res.render('bars/edit-bar', bar)
            } else {
                res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })
            }
        })
        .catch(err => console.log(err))
})

router.post('/edit-bar', (req, res) => {
    const { name, description, image, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coodinates:[latitude, longitude]
    }
    const barId = req.query.id

    Bar
        .findByIdAndUpdate(barId, { name, description, image, location })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => res.render('index'))


router.get('/new-bar', ensureAuthenticated, checkRole(['BOSS']), (req, res) => res.render('bars/new-bar', { user: req.user }))

router.post('/new-bar', (req, res) => {
    const { name, description, image, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const owner = req.user.id

    Bar
        .create({ name, description, owner, image, location })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})

router.get('/delete-bar', (req, res) => {
    
    const barId = req.query.id

    Bar
        .findById(barId)
        .then(bar => {
            if (req.user.id == bar.owner) {
                Bar
                    .findByIdAndDelete(barId)
                    .then(() => res.redirect('/profile'))
                    .catch(err => console.log(err))
            } else {
                res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })
            }
        })
        .catch(err => console.log(err))  
})

module.exports = router





