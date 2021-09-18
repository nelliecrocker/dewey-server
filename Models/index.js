const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

const defineUser = require('./User')
const defineUserBooks = require('./UserBooks')
const defineUserProfile = require('./UserProfile')

const User = defineUser(sequelize, DataTypes)
const UserBooks = defineUserBooks(sequelize, DataTypes)
const UserProfile = defineUserProfile(sequelize, DataTypes)

User.hasOne(UserProfile, {
    // onDelete: "CASCADE"
})
UserProfile.belongsTo(User)

User.hasMany(UserBooks)
UserBooks.belongsTo(User)

// syncDb(sequelize, { alter: true })


module.exports = { User, UserBooks, UserProfile }