require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')//.default;//(session)
const passport = require('passport')
const emitter = require('events') 

//DB Connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...')
}).on('error', function (err) {
    console.log('DB Connection failed...');
});

//Session Store
// let mongoStore = MongoDbStore.create(session({
//     // mongooseConnection: connection,
//     // collection: 'sessions'
//     mongoUrl: url,
// }))

//Event emitter
const eventEmitter = new emitter()
app.set('eventEmitter', eventEmitter)

//Session Config
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: MongoDbStore.create({
            mongoUrl: process.env.MONGO_CONNECTION_URL
        }),
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))

//Passport config
const passportInit = require('./app/config/passport')
const order = require('./app/models/order')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require('./routes/web')(app)
app.use((req, res) => {
    res.status(404).render('errors/404')
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})

