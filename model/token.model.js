const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer',
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;