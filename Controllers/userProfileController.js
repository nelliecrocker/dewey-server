const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { UserProfile } = require("../models")
const { User } = require("../models")


router.post("/create", validateJWT, async (req, res) => {
    const { preferredGenre, favoriteCharacter, collectionSize } = req.body.UserProfile
    const { id } = req.user
    const profileEntry = {
        preferredGenre,
        favoriteCharacter,
        collectionSize
    }
    try {
        let user = await User.findOne({ where: { id: req.user.id } })
        if (user) {
            const newProfile = await UserProfile.create(profileEntry)
            await newProfile.setUser(user)
            res.status(200).json(newProfile)
        } else throw "unable to find a user"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// console.log("********************")
//get all profiles
router.get('/user/:id', validateJWT, async (req, res) => {
    try {
        const user = await User.findOne({
            where: ({id: req.params.id}),
            include: UserProfile
        })
    }catch (err) {
        res.status(500).json({ error: err })
    }
})

//update profile

//delete profile



module.exports = router