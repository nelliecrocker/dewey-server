const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { UserBooksModel } = require("../models")



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
        owner: id
    }
    try {
        const newBook = await UserBooksModel.create(bookEntry)
        res.status(200).json(newBook)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get("/", async (req, res)=> {
    try {
        const allBooks = await UserBooksModel.findAll()
        res.status(200).json(allBooks)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get("/mybooks", validateJWT, async (req, res)=> {
    const {
        id
    } = req.user
    try {
        const userBooks = await UserBooksModel.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userBooks)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get("/:genre", async (req, res)=> { const { genre } = req.params
    try {
        const genreResults = await UserBooksModel.findAll({
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

        const update = await UserBooksModel.update(updatedBook, query)
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
        await UserBooksModel.destroy(query)
        res.status(200).json({ message: "Book Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router