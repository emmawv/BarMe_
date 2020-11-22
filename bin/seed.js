const mongoose = require('mongoose')
const User = require("../models/user.model")
const Bar = require("../models/bar.model")
const express = require('express')
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt");
const bcryptSalt = 10
const dbtitle = 'Proyect2';
mongoose.connect(`mongodb://localhost/${dbtitle}`,  { useUnifiedTopology: true, useNewUrlParser: true });
Bar.collection.drop()
User.collection.drop()
            const salt = bcrypt.genSaltSync(bcryptSalt)


const bars = [
    {
        name: "Slow Mex",
        description: "La mejor cafetería del 2d",
        image:   "https://www.slowmex.com/wp-content/uploads/slowmex-home-03.jpg",
        location:   {
        type: 'Point',
            coordinates: [66546546, 487768]
    },
        comments: [],
        owner: {
            username: "antonio",
            password: bcrypt.hashSync("antonio", salt),
            telephone: 263936489,
            email: "antonio@antonio",
            role:'BOSS'

        }

    },
     {
        name: "Casino",
        description: "Bar guapisimo",
        image:   "",
        location:   {
        type: 'Point',
            coordinates: [57557657, 487768]
    },
        comments: [],
        owner: {
            username: "ali",
            password: bcrypt.hashSync("ali", salt),
            telephone: 263936489,
            email: "ali@ali",
            role:'BOSS'

        }

    },
      {
        name: "Traveller",
        description: "El mejor bar del 2d",
        image:   "",
        location:   {
        type: 'Point',
            coordinates: [66546546, 487768]
    },
        comments: [],
        owner: {
            username: "emm",
            password: bcrypt.hashSync("emm", salt),
            telephone: 263936489,
            email: "emm@emm",
            role:'BOSS'

        }

},  {
        name: "Bar de pepe",
        description: "pepepepeppepepe",
        image: "",
        location:   {
        type: 'Point',
            coordinates: [66546546, 487768]
    },
        comments: [],
        owner: {
            username: "pepe",
            password: bcrypt.hashSync("pepe", salt),
            telephone: 263936489,
            email: "pepe@pepe",
            role:'BOSS'

        }

      }
        



]

// Promise.all(bars.map(bars => User.create(bars.owner).then(owner => owner.name)))
//     .then(() => bars.map(bars => User.findOne({ name: bars.owner.name }).then(owner => {
//         console.log(owner._id,  bars.owner.name)
//         Object.assign({}, bars, { owner: owner._id })
//     })))
//     .then(findOwner => Promise.all(findOwner).then(bars => bars.map(bars => Bar.create(bars))))
//     .then(savedbars => Promise.all(savedbars).then(bars => bars.forEach(bars => console.log(`Bar ${bars.name} creado`))).then(() => mongoose.connection.close()))
//     .catch(error => console.log('Error: ', error))

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
            return User.findOne({username: bars.owner.username})
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

const savedBars = findOwner.then(findOwner => {
    return Promise.all(findOwner)
        .then(bars => {
            return bars.map(bars => {
                const newBar = new Bar(bars);
                return newBar.save();
            })
        })
            .catch(err => console.log("Error while saving the bar: ", err))

}).then(savedBars => {
    Promise.all(savedBars)
        .then(bars => bars.forEach(bars => console.log(`created ${bars.name}`)))
        .then(() => mongoose.connection.close())
        .catch(err => console.log("Error while saving the bar: ", err))
})

module.exports = router
