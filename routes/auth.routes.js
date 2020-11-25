const express = require('express')
const passport = require("passport")
const bcrypt = require("bcrypt");
const bcryptSalt = 10
const router = express.Router()

const User = require('../models/user.model')


//Renders page with 'Sign Up' form
router.get('/signup', (req, res) => res.render('auth/signup.hbs'))


//Adds user to the DB
router.post('/signup', (req, res) => {

    const { username, password } = req.body

    if (username === "" || password === "") {

        res.render("auth/signup", { errorMsg: 'Please fill in all the fields' })

        return
    }

    User
        .findOne({ username })
        .then(user => {

            user ? res.render("auth/signup", { errorMsg: "The user already exists" }) : null

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            return User.create({ username, password: hashPass, role: "GUEST" })
        })
        .then(() => res.redirect('/'))
        .catch(() => res.render("auth/signup", { errorMsg: "There was an error" }))
})


//Renders page with owner's 'Sign Up' form
router.get('/signup/owner', (req, res) => res.render('auth/signup-owner.hbs'))


//Adds owner to the DB
router.post('/signup/owner', (req, res) => {

    const { username, password, telephone, email } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: 'Please fill in all the fields' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            user ? res.render("auth/signup", { errorMsg: "The user already exists" }) : null

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            return User.create({ username, password: hashPass, telephone, email, role: "BOSS" })
        })
        .then(() => res.redirect('/'))
        .catch(() => res.render("auth/signup", { errorMsg: "There was an error" }))
})


//Renders page with 'Log In' form
router.get('/login', (req, res) => res.render('auth/login'))


//Logs in to user session
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
})
)

//Logs out of user session
router.get('/log-out', (req, res) => {
    req.logout()
    res.redirect("/")
})


module.exports = router