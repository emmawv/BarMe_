const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")
const Bar = require("../models/bar.model")

const bcrypt = require("bcrypt");
const bcryptSalt = 10

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' }, console.log('oletú'))
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' }, console.log(req.user.role))

router.get('/profile', ensureAuthenticated, (req, res) => {
    if (req.user.role === 'GUEST') {
        console.log('You are a guest')
        res.render('profile/user', { user: req.user })
    } else if (req.user.role === 'BOSS') {
        Bar.find({ owner: req.user.id })
            .then(bars => res.render('profile/owner', { user: req.user, bars: bars }))
            .catch(err => console.log(err))
    }
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

// router.get('/:id/new', ensureAuthenticated, checkRole('BOSS'), (req, res) => {
//     User
//         .find()
//         .then(resultado => {
//             res.render('new-user', { user: req.user, isBoss: req.user.role.includes('BOSS'), resultado })
//         })

// })

module.exports = router





