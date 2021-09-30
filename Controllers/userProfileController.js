const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
// let { authUser, authRole } = require("../middleware/isAdmin")
const { UserProfile } = require("../models")
const { User } = require("../models")


router.post("/create/:id", validateJWT, async (req, res) => {
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

router.get("/allprofiles", async (req, res) => {
    try {
        const allProfiles = await UserProfile.findAll()
        if (allProfiles) {
            res.status(200).json(allProfiles)
        } else throw "unable to find any profiles"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get("/myprofile", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const userProfile = await UserProfile.findAll({
            where: {
                UserId: id
            }
        })
        if (userProfile) {
            res.status(200).json(userProfile)
        } else throw "unable to find your profile"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put("/update/:profileId", validateJWT, async (req, res) => {

    const { preferredGenre, favoriteCharacter, collectionSize } = req.body.UserProfile

    const profileId = req.params.profileId
    const userId = req.user.id
    try {
        const query = {
            where: {
                id: profileId,
                UserId: userId
            },
            returning: true
        }

        const updatedProfile = {
            preferredGenre: preferredGenre,
            favoriteCharacter: favoriteCharacter,
            collectionSize: collectionSize
        }

        const update = await UserProfile.update(updatedProfile, query)

        if (update) {
            res.status(200).json(update)
        } else throw "unable to update this profile"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.delete("/delete/:profileId", validateJWT, async (req, res) => {
    const profileId = req.params.profileId
    const userId = req.user.id

    try {
        const query = {
            where: {
                id: profileId,
                UserId: userId
            }
        }
        await UserProfile.destroy(query)
        res.status(200).json({ message: "Profile Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



module.exports = router