const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });


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

module.exports = {
    User
}