require('dotenv').config()
const jwt = require("jsonwebtoken")
const { sequelize } = require('../db');
const  { User } = require('../Models')

const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next()
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers
        console.log("authorization -->", authorization)
        const payload = authorization
            ? jwt.verify(
                authorization.includes("Bearer")
                    ? authorization.split(" ")[1]
                    : authorization,
                process.env.JWT_SECRET
            )
            : undefined

            console.log("payload-->", payload)

        if (payload) {
            let foundUser = await User.findOne({ where: { id: payload.id } })
            console.log("foundUser -->",foundUser)

            if (foundUser) {
                console.log("request -->", req)
                req.user = foundUser
                next()
            } else {
                res.status(400).send({ message: "Not Authorized" })
            }
        } else {
            res.status(401).send({ message: "Forbidden" })
        }
    }
}

module.exports = validateJWT