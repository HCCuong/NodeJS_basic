import express from "express"
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import connection from './configs/connectDB'
import initAPIRoute from './route/api'

require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000;
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine
configViewEngine(app)

// Init web route
initWebRoute(app)

// Init API route
initAPIRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})