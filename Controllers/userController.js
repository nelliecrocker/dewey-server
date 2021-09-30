require('dotenv').config()

const router = require("express").Router()
const { User } = require('../Models')
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
let validateJWT = require("../middleware/validate-jwt")


router.post("/register", async (req, res) => {

    let { username, fname, lname, email, password, location } = req.body.user
    try {
        let newUser = await User.create({
            username,
            fname,
            lname,
            email,
            password: bcrypt.hashSync(password, 13),
            location
        })
        let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

        res.status(201).json({
            message: "User successfully registered",
            user: newUser,
            sessionToken: token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            })
        } else {
            res.status(500).json({
                message: "Failed to register user",
                error: err
            })
        }
    }
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user
    try {
        const loginUser = await User.findOne({
            where: {
                username: username
            }
        })

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password)

            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                })

            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }

        } else {
            res.status(401).json({
                message: "No account available"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in",
        })
    }
})

router.put("/update/:userId", validateJWT, async (req, res) => {

    const { username, fname, lname, email, password, location, isAdmin } = req.body.user

    const userId = req.user.id
    try {
        const query = {
            where: {
                UserId: userId
            },
            returning: true
        }

        const updatedUser = {
            username: username,
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            location: location,
            isAdmin: isAdmin
        }

        const update = await User.update(updatedUser, query)

        if (update) {
            res.status(200).json(update)
        } else throw "unable to update this user"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.delete("/delete/:userId", validateJWT, async (req, res) => {
    const userId = req.user.id

    try {
        const query = {
            where: {
                UserId: userId
            }
        }
        await User.destroy(query)
        res.status(200).json({ message: "Profile Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

    module.exports = router