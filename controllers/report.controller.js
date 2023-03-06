const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
let report = require("../db/reportDetails.json");

/**
 * get report details
 * @param {id} report id
 * @returns details of a report
 */
const reportDetails = catchAsync(async (req, res) => {
    const foundReport = report.find(report => report._id === req.params.id);
    if (foundReport) {
        res.status(200).json(foundReport);
    } else {
        throw new ApiError(400, "ID not found")
    }
})

/**
 * get all report details
 * @param null
 * @returns all reports with name and id
 */
const reportAllReports = catchAsync(async (req, res) => {
    const reports = report.map(report => { return { "_id": report._id, "reportName": report.reportName } });
    res.status(200).json(reports);
})


module.exports = {
    reportDetails,
    reportAllReports
}