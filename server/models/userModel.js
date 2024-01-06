const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");

const { DataTypes } = Sequelize;


const Users = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.ENUM('ADMIN', 'OPERATOR', 'CUSTOMER'),
        defaultValue: 'CUSTOMER'
    },
    state: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    zip: {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true,
    }

)

module.exports = Users