const express = require('express')
// const cookieParser = require('cookie-parser')

const app = express()

const cors = require('cors')
// app.use(cors())
app.use(cors({
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

// Express App Configurations
// app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json())

// Express Routing:
const toyRoutes = require('./api/toy/toy.controller')
app.use('/api/toy', toyRoutes)

app.get('/**', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 3030;

app.listen(port, () => console.log('Server listening on port port!'))