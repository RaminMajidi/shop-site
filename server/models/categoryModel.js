const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");


const { DataTypes } = Sequelize;


const Category = db.define("category", {
    parentId: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
    }

)

Category.hasOne(Category)
Category.belongsTo(Category, { foreignKey: 'parentId' })


module.exports = Category