const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });


const UserProfile = sequelize.define("UserProfile", {
    preferredGenre: {
        type: DataTypes.STRING
    },
    favoriteCharacter: {
        type: DataTypes.STRING
    },
    collectionSize: {
        type: DataTypes.STRING
    }
})

module.exports = {
    UserProfile
}