const express = require('express')
const { reportController } = require('../../controllers')

const router = express.Router()

router.get('/report-details/:id', reportController.reportDetails)

router.get('/get-all-reports', reportController.reportAllReports)

module.exports = router