const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const dayjs = require('dayjs');

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
    },
    date: {
        type: DataTypes.VIRTUAL,
        get() {
            return dayjs(this.createdAt).format('MM/DD/YYYY hh:mma');
        }
    }
}, 
{
    modelName: 'user_coos',
    freezeTableName: true,
    sequelize: db
});

module.exports = Coo;