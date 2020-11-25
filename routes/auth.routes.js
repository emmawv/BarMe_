const express = require('express')
const router = express.Router()

const passport = require("passport")
const bcrypt = require("bcrypt");
const bcryptSalt = 10

const User = require('../models/user.model')

router.get('/signup',(req, res)=> {
    res.render('auth/signup.hbs')
})

router.post('/signup',(req, res)=> {

    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }

            // Other validations
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass ,role:"GUEST"})
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup", { errorMsg: "Hubo un error" }))
        })
        .catch(error => next(error))
})

router.get('/signup/owner',(req, res)=> {
    res.render('auth/signup-owner.hbs')
})

router.post('/signup/owner',(req, res)=> {
  
    const { username, password, telephone, email } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass, telephone, email, role: "BOSS" })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup", { errorMsg: "Hubo un error" }))
        })
        .catch(error => next(error))
})

router.get('/login',(req, res)=> {
    res.render('auth/login')
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
    })
)
    
module.exports = router