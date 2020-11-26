const transporter = require('../configs/nodemailer.config')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {

    const barId = req.body.barId
    const { email, subject, message } = req.body

    transporter
        .sendMail({
            from: '"BarMe_ Contact" <barmecontacto@gmail.com>',
            to: email,
            subject,
            text: message,
            html: `<b>${message}</b>`
        })
        .then(() => res.redirect(`/bars/${barId}`))
        .catch(error => console.log(error))
})

module.exports = router