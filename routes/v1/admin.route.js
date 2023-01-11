const express = require('express')
const { adminController } = require('../../controllers')
const auth = require('../../middleware/auth')

const router = express.Router()

router.post('/signin', adminController.signin)

router.post('/add-customer', auth, adminController.addCustomer)

router.patch('/edit-customer/:id', auth, adminController.editCustomer)

router.get('/get-customer/:id', auth, adminController.customerDetails)

router.get('/get-all-customers', auth, adminController.getCustomers)

router.patch('/delete-customer/:id', auth, adminController.deleteCustomer)

router.patch('/active-deactive-customer/:id', auth, adminController.activeDeactivateCustomer)

module.exports = router