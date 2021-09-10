require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');
const express = require('express')
const app = express()
const port = 3000
const auth = require("./Controllers/Auth")
const db = require('./db')

app.use("/", auth)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



User.hasOne(UserProfile, {
    // onDelete: "CASCADE"
})
UserProfile.belongsTo(User)

User.hasMany(UserBooks)
UserBooks.belongsTo(User)



    ; ((async () => {
        await sequelize.sync(
            { force: true }
        )

        // let myUser = await User.create({
        //     username: "user1",
        //     fname: "Nellie",
        //     lname: "Crocker",
        //     email: "crocker.nellie@gmail.com",
        //     password: "password1",
        //     location: "McCordsville"
        // })

        // let myProfile = await UserProfile.create({
        //     preferredGenre: "fiction",
        //     favoriteCharacter: "Ron Weasley",
        //     collectionSize: 145
        // })

        // let harryPotter = await UserBooks.create({
        //     title: "Harry Potter and the Sorcerer's Stone",
        //     author: "J.K. Rowling",
        //     genre: "Fiction",
        //     cover: "none",
        //     sharedWith: "Jessie Eskew",
        //     sharedDate: new Date()
        // })

        // let harryPotterTwo = await UserBooks.create({
        //     title: "Harry Potter and the Chamber of Secrets",
        //     author: "J.K. Rowling",
        //     genre: "Fiction",
        //     cover: "none",
        //     sharedWith: "Alissa Prater",
        //     sharedDate: new Date()
        // })

        // let harryPotterThree = await UserBooks.create({
        //     title: "Harry Potter and the Order of the Phoenix",
        //     author: "J.K. Rowling",
        //     genre: "Fiction",
        //     cover: "none",
        //     sharedWith: "Tyler Prater",
        //     sharedDate: new Date()
        // })

        // await myUser.setUserProfile(myProfile)
        // await myUser.addUserBooks([harryPotter, harryPotterTwo, harryPotterThree])

    })());