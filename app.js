require('dotenv').config()


const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });


//Models

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING
    },
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    }
})

const UserBooks = sequelize.define("UserBooks", {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    },
    cover: {
        type: DataTypes.STRING
    },
    sharedWith: {
        type: DataTypes.STRING
    },
    sharedDate: {
        type: DataTypes.DATE
    }
})

const UserProfile = sequelize.define("UserProfile", {
    //! needs to be UserBooks
    books: {
        type: DataTypes.STRING
    },
    onShelf: {
        type: DataTypes.BOOLEAN
    },
    review: {
        type: DataTypes.STRING
    },
    dateRead: {
        type: DataTypes.DATE
    }
})

User.hasOne(UserProfile, {
    // onDelete: "CASCADE"
})
UserProfile.belongsTo(User)

User.hasMany(UserBooks)
UserBooks.belongsTo(User)



    ; ((async () => {
        await sequelize.sync(
            // { force: true }
        )

        let myUser = await User.create({
            username: "user1",
            fname: "Nellie",
            lname: "Crocker",
            email: "crocker.nellie@gmail.com",
            password: "password1",
            location: "McCordsville"
        })
    })());