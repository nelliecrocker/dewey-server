require('dotenv').config()
const express = require('express');
const { sequelize } = require('./db');
const app = express()
const port = 3000

    ;(async () => {

        sequelize.sync()
        app.use(require("./middleware/headers"))
        app.use(express.json())

        // const auth = require("./middleware/Auth")
        // app.use("/auth", auth)

        const user = require("./Controllers/userController")
        app.use("/user", user)

        // const book = require("./Controllers/userBooksController")
        // app.use("/book", book)

        // const profile = require('./Controllers/userProfileController')
        // app.use('/profile', profile)

        app.listen(port, () => {
            console.log(`Dewey server listening at http://localhost:${port}`)
        })
    })()