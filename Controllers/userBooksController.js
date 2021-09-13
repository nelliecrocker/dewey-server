const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { UserBooks } = require("../models")
const { User } = require("../models")


router.post("/create", validateJWT, async (req, res) => {
    const { title, author, genre, cover, sharedWith, sharedDate } = req.body.book
    const { id } = req.user
    // console.log(id);
    const bookEntry = {
        title,
        author,
        genre,
        cover,
        sharedWith,
        sharedDate,
        // owner: id
    }
    try {
        let user = await User.findOne({ where: { id: req.user.id }})
        if (user) {
            const newBook = await UserBooks.create(bookEntry)
            await newBook.setUser(user)
            res.status(200).json(newBook)
        } else throw "unable to find a user"
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

router.get("/allbooks", async (req, res)=> {
    try {
        const allBooks = await UserBooks.findAll()
        if (allBooks){
            res.status(200).json(allBooks)
        } else throw "unable to find your books"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// console.log("****************");

// router.get("/my", validateJWT, async (req, res)=> {
//     const {
//         id
//     } = req.user
//     try {
//         const userBooks = await UserBooks.findAll({
//             where: {
//                 owner: id
//             }
//         })
//         res.status(200).json(userBooks)
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// })


router.get("/:genre", async (req, res)=> { const { genre } = req.params
    try {
        const genreResults = await UserBooks.findAll({
            where: {
                genre: genre
            }
        })
        res.status(200).json(genreResults)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.put("/update/:bookId", validateJWT, async (req, res) => {
    const { title, author, genre, cover, sharedWith, sharedDate } = req.body
    const bookId = req.params.bookId
    const userId = req.user.id

    console.log({ title, author, genre, cover, sharedWith, sharedDate, bookId, userId });
    const query = {
        where: {
            id: bookId,
            owner: userId
        }
    }

    const updatedBook = {
        title: title,
        author: author,
        genre: genre,
        cover: cover,
        sharedWith: sharedWith,
        sharedDate: sharedDate
    }

        const update = await UserBooks.update(updatedBook, query)
        res.status(200).json(update)
    
})


router.delete("/delete/:bookId", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const bookId = req.params.bookId

    try {
        const query = {
            where: {
                id: bookId,
                owner: ownerId
            }
        }
console.log("test");
        await UserBooks.destroy(query)
        res.status(200).json({ message: "Book Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router