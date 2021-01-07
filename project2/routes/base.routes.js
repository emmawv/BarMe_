const express = require('express')
const uploadCloud = require("../configs/cdn-upload.config")
const keymaps = process.env.KEYMAPS
const myKey = process.env.APIKEY

const router = express.Router()

const Bar = require("../models/bar.model")
const User = require("../models/user.model")


//Checks if user is logged in
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Unauthorised, log in' })


//Checks if user's role is allowed to do action
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Unauthorised, you do not have permissions' })


//Renders main page
router.get('/', (req, res) => res.render('index'))


//Renders user's profile page
router.get('/profile', ensureAuthenticated, (req, res, next) => {
    if (req.user.role === 'GUEST') {
        User
            .findById(req.user.id)
            .populate({
                path: 'favBars',
                populate: { path: 'barid' }
            })
            .then(user => res.render('profile/user', { user }))

    } else if (req.user.role === 'BOSS') {
        Bar
            .find({ owner: req.user.id })
            .then(bars => res.render('profile/owner', { user: req.user, bars: bars }))
            .catch(err => next(err))
                
    } else if (req.user.role === 'ADMIN') {
        User.find()
            .then(users => res.render('profile/admin', { users }))
            .catch(err => next(err))
    }

})


//Renders the form to edit user's profile
router.get('/edit-user', ensureAuthenticated, (req, res) => {

    User
        .findById(req.user.id, { username: 1, password: 1, location: 1, email: 1, profileImg: 1, telephone: 1 })
        .then(user => res.render('profile/edit-user', user))
        .catch(err => next(err))
})


//Update the user in the DB
router.post('/edit-user', uploadCloud.single("profileImg"), (req, res) => {

    const userid = req.user.id
    const { name, email, telephone } = req.body
    if (req.file !== undefined) {

        const profileImg = req.file.path

        User
            .findByIdAndUpdate(userid, { name, email, profileImg, telephone })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))
    }
    else {

        User
            .findByIdAndUpdate(userid, { name, email, telephone })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))

    }
})


//Renders the form to edit an owner's bar
router.get('/edit-bar', ensureAuthenticated, checkRole('BOSS'), (req, res, next) => {

    const barId = req.query.id


    Bar
        .findById(barId, { name: 1, description: 1, image: 1, location: 1, owner: 1 })
        .then(bar => {
            if (req.user.id == bar.owner) {
                res.render('bars/edit-bar', bar)
            } else {
                res.render('auth/login', { errorMsg: 'Unauthorised, you do not have permissions' })
            }
        })
        .catch(err => next(err))
})


//Updates the bar in the DB
router.post('/edit-bar', uploadCloud.single("image"), (req, res, next) => {

    const barId = req.query.id

    const { name, description, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    
    if (req.file !== undefined) {

        const image = req.file.path

        Bar
            .findByIdAndUpdate(barId, { name, description, image, location })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))
        
    } else {

        Bar
            .findByIdAndUpdate(barId, { name, description, location })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))

    }
})


//Renders form to create a new bar
router.get('/new-bar', ensureAuthenticated, checkRole(['BOSS']), (req, res) => res.render('bars/new-bar', { user: req.user, keymaps, myKey }))


//Creates the new bar in the DB
router.post('/new-bar', uploadCloud.single("image"), (req, res, next) => {

    const owner = req.user.id
    const { name, description, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    if (req.file !== undefined) {

        const image = req.file.path

        Bar
            .create({ name, description, image, owner, location })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))

    } else {

        Bar
            .create({ name, description, owner, location })
            .then(() => res.redirect('/profile'))
            .catch(err => next(err))
    }
})


//Deletes bar from the DB
router.get('/delete-bar', (req, res, next) => {

    const barId = req.query.id

    Bar
        .findById(barId)
        .then(bar => {
            if (req.user.id == bar.owner) {
                Bar
                    .findByIdAndDelete(barId)
                    .then(() => res.redirect('/profile'))
                    .catch(err => next(err))

            } else {
                res.render('auth/login', { errorMsg: 'Unauthorised, you do not have permissions' })
            }
        })
        .catch(err => next(err))
})


//Adds the bar to favourites in the DB
router.post('/profile/favourites', ensureAuthenticated, (req, res, next) => {
    const barid = req.body.barid

    User
        .findById(req.user.id, { favBars: 1 })
        .then(userdata => {

            const favBars = userdata.favBars.concat({ barid })

            return User
                .findByIdAndUpdate(req.user.id, { favBars }, { new: true })
                .populate({
                    path: 'favBars',
                    populate: { path: 'barid' }
                })
        })
        .catch(err => next(err))
})


//Removes the bar from favourites in the DB
router.post('/profile/remove-favourites', (req, res, next) => {


    const barId = req.body.barid
    const newfavBars = req.user.favBars.filter(bar => bar.barid != barId)


    User
        .findByIdAndUpdate(req.user.id, { favBars: newfavBars }, { new: true })
        .catch(err => next(err))

})

//Removes Users

router.get('/delete-user/:id', (req, res, next) => {

    const userid = req.params.id

    Bar
        .deleteMany({ owner: userid })
        .then(() => User.findByIdAndDelete(userid))
        .then(()=> res.redirect('/profile'))
        .catch(err=>next())   
})


module.exports = router





