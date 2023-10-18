const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const db = require('../config/connection');

class User extends Model { }

// Call the User class and setup a couple columns for it
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true, 
            msg: 'That email address is already in use.'
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 6, 
                msg: 'Password must be at least 6 characters long.'
            }
        }
    }
}, {
    modelName: 'user',
    // Connection object
    sequelize: db,
    hooks: {
        // Hook into the user right before it gets added to the table
        async beforeCreate(user) {
            // Encrypt the user's password with 10 salts (layers of encryption)
            user.password = await hash(user.password, 10);

            return user;
        }
    }
});

// Create a method on the user that will compare the password they submitted in the login form to the encrypted password in the database
User.prototype.validatePass = async function(form_password) {
    const is_valid = await compare(form_password, this.password);

    return is_valid;
}

module.exports = User;