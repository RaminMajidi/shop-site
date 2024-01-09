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

Category.hasMany(Category, { as: 'children', foreignKey: 'parentId', useJunctionTable: true })


module.exports = Category