const mongoose = require('mongoose')
const salt = bcrypt.genSaltSync(bcryptSalt)
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const bcryptSalt = 10
const dbtitle = 'bar-me';

mongoose.connect(`mongodb://localhost/${dbtitle}`, { useUnifiedTopology: true, useNewUrlParser: true });

const User = require("../models/user.model")
const Bar = require("../models/bar.model")

Bar.collection.drop()
User.collection.drop()

const bars = [
    {
        name: "Slow Mex",
        description: "La mejor cafetería del 2d",
        image: "https://www.slowmex.com/wp-content/uploads/slowmex-home-03.jpg",
        location: {
            type: 'Point',
            coordinates: [40.42582395092801, -3.704541805551515]
        },
        comments: [],
        owner: {
            username: "antonio",
            password: bcrypt.hashSync("antonio", salt),
            telephone: 263936489,
            email: "antonio@antonio",
            role: 'BOSS'
        }
    },
    {
        name: "Casino",
        description: "Bar guapisimo",
        image: "https://res.cloudinary.com/djqsmqs26/image/upload/v1606062108/Project-2/french-bar-58c2365f5f9b58af5ce3fe9c_yjdmlq.jpg ",
        location: {
            type: 'Point',
            coordinates: [37.404024176522974, -1.5806011025189242]
        },
        comments: [],
        owner: {
            username: "ali",
            password: bcrypt.hashSync("ali", salt),
            telephone: 263936489,
            email: "ali@ali",
            role: 'BOSS'
        }
    },
    {
        name: "Traveller",
        description: "El mejor bar del 2d",
        image: " https://res.cloudinary.com/djqsmqs26/image/upload/v1606062118/Project-2/29063223_821844301324066_7645613196588184819_n_khrazv.jpg ",
        location: {
            type: 'Point',
            coordinates: [40.42762542924357, -3.70322701953486]
        },
        comments: [],
        owner: {
            username: "emm",
            password: bcrypt.hashSync("emm", salt),
            telephone: 263936489,
            email: "emm@emm",
            role: 'BOSS'
        }
    },
    {
        name: "Bar Pepe",
        description: "pepepepeppepepe",
        image: "https://res.cloudinary.com/djqsmqs26/image/upload/v1606062110/Project-2/l_amlzlr.jpg ",
        location: {
            type: 'Point',
            coordinates: [40.426589210930906, -3.7038479117741394]
        },
        comments: [],
        owner: {
            username: "pepe",
            password: bcrypt.hashSync("pepe", salt),
            telephone: 263936489,
            email: "pepe@pepe",
            role: 'BOSS'
        }
    }
]

const createOwner = bars.map(bars => {
    const newOwner = new User(bars.owner)
    return newOwner.save()
        .then(owner => {
            return owner.name;
        })
        .catch(error => {
            throw new Error(`Impossible to add the user. ${error}`)
        })
})

let findOwner = Promise.all(createOwner)
    .then(owner => {
        return bars.map(bars => {
            return User.findOne({ username: bars.owner.username })
                .then(owner => {
                    if (!owner) {
                        throw new Error(`unknown user ${bars.owner.username}`);
                    }
                    return Object.assign({}, bars, { owner: owner._id });
                })
                .catch(err => console.log("findowneeeeeeeeeer: ", err))

        });
    })
    .catch(error => {
        throw new Error(error)
    })

const savedBars = findOwner
    .then(findOwner => {
        return Promise.all(findOwner)
    .then(bars => {
        return bars.map(bars => {
            const newBar = new Bar(bars);
            return newBar.save();
        })
    })
    .catch(err => console.log("Error while saving the bar: ", err))
    })
    .then(savedBars => {
        Promise.all(savedBars)
            .then(bars => bars.forEach(bars => console.log(`created ${bars.name}`)))
            .then(() => mongoose.connection.close())
            .catch(err => console.log("Error while saving the bar: ", err))
})

module.exports = router
