const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    delete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Active'
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;