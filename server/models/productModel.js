const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");
const Category = require("./categoryModel.js");

const { DataTypes } = Sequelize;


const Product = db.define("product", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metaTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
    }


},
    {
        freezeTableName: true,
    }

)

User.hasMany(Product)
Product.belongsTo(User, { foreignKey: 'userId' })
Category.hasMany(Product)
Product.belongsTo(Category, { foreignKey: 'categoryId' })

module.exports = Product