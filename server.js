const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

// app.use(cors())
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true
// }))

// Express App Configurations
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Express Routing:
const toyRoutes = require('./api/toy/toy.routes')
const userRoutes = require('./api/user/user.routes')
const authRoutes = require('./api/auth/auth.routes')

app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => console.log('Server listening on port port!' + port))

// function tryMongo() {
//     const MongoClient = require('mongodb').MongoClient
//     const url = 'mongodb://localhost:27017'
//     const dbName = 'toyDB'
//     MongoClient.connect(url, (err, client) => {
//         if (err) return console.log('Cannot connect to DB')
//         console.log('Connected successfully to server')
//         const db = client.db(dbName)
//         const collection = db.collection('customer')
//         // Find some documents
//         collection.find({ balance: { $gte: 10 } }).toArray((err, docs) => {
//             if (err) return console.log('Cannot find customers')
//             console.log("Found the following records")
//             console.log(docs)
//         })
//         client.close()
//     })
// }