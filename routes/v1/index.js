const express = require('express')
const adminRoute = require('./admin.route')
const customerRoute = require('./customer.route')

const router = express.Router()

router.use('/admin', adminRoute)
router.use('/customer', customerRoute)

module.exports = router