const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const { PORT } = require("./constant/common")
const helmet = require('helmet')
const express = require('express')
const routesV1 = require('./routes/v1')

const app = express()

dotenv.config();

app.use(express.json());

app.use(cors())
app.options('*', cors())

app.use(helmet())

app.use('/v1', routesV1)

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => (
            console.log("server is running", PORT)
        ));
    })
    .catch(err => console.log(err));