require('dotenv').config()

const router = require("express").Router()
const { User } = require('../models')
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


// router.delete("/delete/:userId", validateJWT, async (req, res) => {
//     const userId = req.user.id
//     const user = await User.create({ id: userId })
//     console.log(user.name);
//     await user.destroy()
// })

router.delete("/delete/:userId", validateJWT, async (req, res) => {
    const userId = req.user.id

//According to Amit, use this as a check to see if Admin is true or false; store as state
    // if(req.user.isAdmin == "true") {
    //     res.status(200)
    //     return res.send('Welcome Admin')
    // } else {
    //     return res.send('Welcome User')
    // }

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


    //     try {
    //         const query = {
    //             where: {
    //                 id: userId
    //             }
    //         }
    //         console.log("************");
    //         await User.destroy(query)
    //         res.status(200).json({ message: "User Removed" })
    //     } catch (err) {
    //         res.status(500).json({ error: err })
    //     }
    // })

    module.exports = router