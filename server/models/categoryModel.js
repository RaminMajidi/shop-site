const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");


const { DataTypes } = Sequelize;


const Category = db.define("category", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        freezeTableName: true,
    }

)




module.exports = Category