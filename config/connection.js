const { Sequelize } = require('sequelize');
require('dotenv').config(); // Might need to add path.join(__dirname, '../.env') inside config()

// Create and export the database connection
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: 'localhost',
        dialect: 'mysql'
});

module.exports = sequelize;