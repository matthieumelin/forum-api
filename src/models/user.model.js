'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');

class User extends Model { };

User.init({
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    displayName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users"
});

module.exports = User;