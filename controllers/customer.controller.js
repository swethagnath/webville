const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { emailSchema } = require("../utils/validation");
const { Customer, Token } = require("../model");

// customer register
// params email, name, phone, password,
// return customer
const register = catchAsync(async (req, res) => {
    const { email, name, phone, password, } = req.body
    const hashedPassword = await bcryptjs.hash(password, 8)
    //add customer
    const customer = await Customer.create({ email, name, phone, password: hashedPassword })
    return res.status(200).json({ payload: customer })
})

//customer login
//  Params - email, password
//  Return - token, message
const login = catchAsync(async (req, res) => {
    const params = { email, password } = req.body;

    const loginValidation = emailSchema.validate(params);
    const { error } = loginValidation;

    if (error) {
        return res.status(400).json({ message: "Invalid email/password", data: { format: ["password min 2", "invalid email format"] } });
    }

    //find customer and send jwt token

    Customer.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(400).json({ error: "Invalid email/password" });
            };
            bcryptjs.compare(password, savedUser.password)
                .then(async doMatch => {
                    if (!doMatch) {
                        return res.status(400).json({ error: "Invalid email/password" })
                    };

                    let token = jwt.sign({ _id: savedUser._id, role: "user" }, process.env.JWT_SECRET);
                    await Token.create({ token, user: savedUser._id })
                    return res.status(200).json({ token, message: "Logged in successfully" });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

//edit customer
//  Params - email, name, phone, password
//  Return - updated customer
const editCustomer = catchAsync(async (req, res) => {
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
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

// logout customer
const logoutCustomer = catchAsync(async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.replace("Bearer Bearer ", "");
    const refreshTokenDoc = await Token.findOne({ token })
    if (!refreshTokenDoc) {
        throw new ApiError(400, 'Not found')
    }
    await refreshTokenDoc.remove()
    return res.status(200).json({ msg: "logout successfully" })
})

module.exports = {
    register,
    login,
    editCustomer,
    deleteCustomer,
    logoutCustomer
}