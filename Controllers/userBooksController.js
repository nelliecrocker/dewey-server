const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { UserBooks } = require("../Models")
const { User } = require("../Models")


router.post("/create", validateJWT, async (req, res) => {
    const { title, author, genre, cover, sharedWith, sharedDate } = req.body.book
    const { id } = req.user
    const bookEntry = {
        title,
        author,
        genre,
        cover,
        sharedWith,
        sharedDate,
    }
    try {
        let user = await User.findOne({ where: { id: req.user.id } })
        if (user) {
            const newBook = await UserBooks.create(bookEntry)
            await newBook.setUser(user)
            res.status(200).json({
                book: newBook,
                message: "Book successfully created!",
            })

        } else throw "unable to find a user"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get("/allbooks", async (req, res) => {
    try {
        const allBooks = await UserBooks.findAll()
        if (allBooks) {
            res.status(200).json(allBooks)
        } else throw "unable to find any books"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get("/mybooks", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const userBooks = await UserBooks.findAll({
            where: {
                UserId: id
            }
        })
        if (userBooks) {
            res.status(200).json(userBooks)
        } else throw "unable to find your books"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get("/:genre", async (req, res) => {
    const { genre } = req.params
    try {
        const genreResults = await UserBooks.findAll({
            where: {
                genre: genre
            }
        })
        if (genreResults) {
            res.status(200).json(genreResults)
        } else throw "unable to find any books with that genre"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



router.put("/update/:bookId", validateJWT, async (req, res) => {

    const { title, author, genre, cover, sharedWith, sharedDate } = req.body.book

    const bookId = req.params.bookId
    const userId = req.user.id
    try {
        const query = {
            where: {
                id: bookId,
                UserId: userId
            },
            returning: true
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

        if (update) {
            res.status(200).json(update)
        } else throw "unable to update this book"
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



router.delete("/delete/:bookId", validateJWT, async (req, res) => {
    const bookId = req.params.bookId
    const userId = req.user.id

    try {
        const query = {
            where: {
                id: bookId,
                UserId: userId
            }
        }
        await UserBooks.destroy(query)
        res.status(200).json({ message: "Book Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router