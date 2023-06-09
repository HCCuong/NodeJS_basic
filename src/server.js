import express from "express"
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import connection from './configs/connectDB'
import initAPIRoute from './route/api'
import multer from 'multer'

require('dotenv').config()
var morgan = require('morgan')

const app = express()

const port = process.env.PORT || 3000;
const path = require('path')

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine
configViewEngine(app)

// Init web route
initWebRoute(app)

// Init API route
initAPIRoute(app)

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})