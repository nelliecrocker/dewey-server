const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });


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

module.exports = {
    UserBooks
}