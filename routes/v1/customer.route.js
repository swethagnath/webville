const express = require('express')
const { customerController } = require('../../controllers')
const auth = require('../../middleware/auth')

const router = express.Router()

router.post('/register', customerController.register)

router.post('/login', customerController.login)

router.patch('/edit-customer/:id', auth, customerController.editCustomer)

router.patch('/delete-customer/:id', auth, customerController.deleteCustomer)

router.delete('/logout-customer/:id', auth, customerController.logoutCustomer)

module.exports = router