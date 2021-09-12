module.exports = (sequelize, DataTypes) => {

const UserProfile = sequelize.define("UserProfile", {
        preferredGenre: {
            type: DataTypes.STRING,        allowNull: false
        },
        favoriteCharacter: {
            type: DataTypes.STRING,        allowNull: false
        },
        collectionSize: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return UserProfile
}