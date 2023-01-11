const { Admin } = require("./model")
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

mongoose
    .connect('mongodb://127.0.0.1:27017/webville', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected')
    })

const seedDb = async () => {
    console.log(Admin)
    const password = await bcryptjs.hash('password', 8)
    let savedUser = await Admin.create({ email: 'swetha@gmail.com', password })
    console.log(await bcryptjs.compare('password', savedUser.password))
}

seedDb()
    .then(() => {
        mongoose.connection.close()
    })