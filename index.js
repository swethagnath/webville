const dotenv = require("dotenv")
const cors = require("cors")
const { PORT } = require("./constant/common")
const helmet = require('helmet')
const express = require('express')
const routesV1 = require('./routes/v1')
const ApiError = require('./utils/ApiError')

const app = express()

dotenv.config();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.options('*', cors())

app.use(helmet())

app.use('/v1', routesV1)

app.listen(PORT, () => (
    console.log("server is running", PORT)
));