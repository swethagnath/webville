const jwt = require("jsonwebtoken");
const { Admin, Customer, Token } = require("../model");

module.exports = async (req, res, next) => {
    if (req && req.headers) {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ error: "you must be logged in" });
        }

        const token = authorization.replace("Bearer Bearer ", "");
        const tokenDestroyed = await Token.findOne({ token, blacklisted: true })
        if (tokenDestroyed) {
            return res.status(401).json({ error: "token not found" });
        }
        // token verification
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ error: err })
            }

            const { _id, role } = payload
            let user
            if (role == "admin") {
                user = Admin.findById(_id)
            } else {
                user = Customer.findById(_id)
            }
            user
                .then(userdata => {
                    if (userdata) {
                        req.user = userdata
                        next();
                    } else {
                        return res.status(401).json({ error: "user doesnt exist" })
                    }
                })
        })
    }
}