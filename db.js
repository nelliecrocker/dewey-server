const { Sequelize } = require('sequelize');
// const { options } = require('./middleware/validate-jwt');

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
            host: process.env.DB_HOST,
        dialect: 'postgres',
        //comment out dialect options if work on local host
        dialectOptions: {
            ssl:{
                    require: true,
                    rejectUnauthorized: false
                }
    }
    });


async function syncDb(sequelize, options) {
    const { force, alter } = options
    try {
        if (force)
            await sequelize.sync({ force: true })
        else if (alter)
            await sequelize.sync({ alter: true })
        else
            await sequelize.sync()
    } catch (err) {
        console.log(err);
    }
}

//error handling for admin/role
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ message: 'Invalid token' })
    }
    return res.status(500).json({ message: err.message })
}


module.exports = {
    sequelize,
    syncDb,
    errorHandler
}