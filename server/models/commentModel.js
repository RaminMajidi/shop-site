const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const Product = require("./productModel");

const { DataTypes } = Sequelize


const Comments = db.define('comments', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 5 }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        freezeTableName: true
    })


Product.hasMany(Comments)
Comments.belongsTo(Product)


module.exports = Comments