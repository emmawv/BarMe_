const express = require('express')
const router = express.Router()
const passport = require("passport")
const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const bcryptSalt = 10

// Endpoints
router.get('/', (req, res) => res.render('index'))
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('login', { errorMsg: 'Desautorizado, inicia sesión' }, console.log('oletú'))
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('login', { errorMsg: 'Desautorizado, no tienes permisos' }, console.log('oleyo'))

router.get('/profile', ensureAuthenticated, (req, res)=>{
    const id = req.params.id
    res.render('profile')
})
// router.get('/:id/new', ensureAuthenticated, checkRole('BOSS'), (req, res) => {
//     User
//         .find()
//         .then(resultado => {
//             res.render('new-user', { user: req.user, isBoss: req.user.role.includes('BOSS'), resultado })
//         })

// })

module.exports = router





