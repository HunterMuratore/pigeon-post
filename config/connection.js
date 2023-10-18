const { Sequelize } = require('sequelize');
require('dotenv').config(); // Might need to add path.join(__dirname, '../.env') inside config()

const is_production = process.env.PORT;
let sequelize;

// Create and export the database connection - if you are on Heroku then is_production is true (need to supply the random session key - use codeigniter password from randomkeygen.com)
if(is_production) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USERNAME, 
        process.env.DB_PASSWORD, 
        {
            host: 'localhost',
            dialect: 'mysql',
            // Turns off sql logging in terminal
            logging: false
    });
}

module.exports = sequelize;