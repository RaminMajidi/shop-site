const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");

const { DataTypes } = Sequelize;

const Baner = db.define("baner", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        freezeTableName: true,
    }
)

module.exports = Baner