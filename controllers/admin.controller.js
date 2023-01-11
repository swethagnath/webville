const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { emailSchema } = require("../utils/validation");
const { Admin, Customer } = require("../model");

//  sign in admin
//  Params - email, password
//  Return - token, message

const signin = catchAsync(async (req, res) => {
    const params = { email, password } = req.body;

    const loginValidation = emailSchema.validate(params);
    const { error } = loginValidation;

    if (error) {
        return res.status(400).json({ message: "Invalid email/password", data: { format: ["password min 2", "invalid email format"] } });
    }

    //find admin and send jwt token
    Admin
        .findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(400).json({ error: "Invalid email/password" });
            };
            bcryptjs.compare(password, savedUser.password)
                .then(doMatch => {
                    if (!doMatch) {
                        return res.status(400).json({ error: "Invalid email/password" })
                    };

                    let token = jwt.sign({ _id: savedUser._id, role: "admin" }, process.env.JWT_SECRET);
                    return res.status(200).json({ token, message: "Logged in successfully" });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

//  add customer
//  Params - email, name, phone, password
//  Return - new customer
const addCustomer = catchAsync(async (req, res) => {
    const { email, name, phone, password, } = req.body
    const hashedPassword = await bcryptjs.hash(password, 8)
    //add customer
    const customer = await Customer.create({ email, name, phone, password: hashedPassword })
    return res.status(200).json({ payload: customer })
})

//  edit customer
//  Params - email, name, phone, password
//  Return - updated customer
const editCustomer = catchAsync(async (req, res) => {
    //edit customer
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    return res.status(200).json({ payload: customer })
})

//  find a customer
//  Params - id
//  Return - list of  customer
const customerDetails = catchAsync(async (req, res) => {
    //find customer
    const customer = await Customer.find({ _id: req.params.id })
    return res.status(200).json({ payload: customer })
})

//  get customers
//  Params - null
//  Return - list of  customers
const getCustomers = catchAsync(async (req, res) => {
    //find all customers
    const customer = await Customer.find({ status: 'Active' })
    return res.status(200).json({ payload: customer })
})

//  delete customers
//  Params - id
//  Return - deleted customer
const deleteCustomer = catchAsync(async (req, res) => {
    //delete customer
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, { delete: true }, { new: true })
    return res.status(200).json({ payload: customer })
})

//  active-deactive customers
//  Params - id, status
//  Return - activeDeactivate customer
const activeDeactivateCustomer = catchAsync(async (req, res) => {
    const { status } = req.body
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, { status }, { new: true })
    return res.status(200).json({ payload: customer })
})

module.exports = {
    signin,
    addCustomer,
    editCustomer,
    customerDetails,
    getCustomers,
    deleteCustomer,
    activeDeactivateCustomer
}