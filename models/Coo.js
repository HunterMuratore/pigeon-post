const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Coo extends Model { }

Coo.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 3, 
                msg: 'Your Coo must be at least 3 characters long'
            }
        }
    }
}, 
{
    modelName: 'user_coos',
    freezeTableName: true,
    sequelize: db
});

module.exports = Coo;