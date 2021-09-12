module.exports = (sequelize, DataTypes) => {
    const UserBooks = sequelize.define("UserBooks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sharedWith: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sharedDate: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return UserBooks
}
