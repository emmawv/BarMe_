module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/bars', require('./bar.routes.js'))
    app.use('/api', require('./api.routes.js'))
    app.use('/send-email', require('./email.routes.js'))
}