const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const passport = require("passport")
const bcrypt = require("bcrypt");
const bcryptSalt = 10

router.get('/signup',(req, res)=> {
    res.render('signup.hbs')
})

router.post('/signup',(req, res)=> {
    // const username = req.body.username
    // const password = req.body.password
    
    // User
    //     .create({
    //         role: "GUEST",
    //         username,
    //         password,

    // })
    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("signup", { errorMsg: "El usuario ya existe" })
                return
            }

            // Other validations
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass ,role:"GUEST"})
                .then(() => res.redirect('/'))
                .catch(() => res.render("signup", { errorMsg: "Hubo un error" }))
        })
        .catch(error => next(error))
    
    
})

router.get('/signup/owner',(req, res)=> {
    res.render('signup-owner.hbs')
})




router.post('/signup/owner',(req, res)=> {
    const username = req.body.username
    const password = req.body.password
    const telephone = req.body.telephone
    const email = req.body.email
   

    User
        .create({
            role: "BOSS",
            username,
            password,
            telephone,
            email,
            

    })
    


})

router.get('/login',(req, res)=> {
    res.render('login')
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))
module.exports = router