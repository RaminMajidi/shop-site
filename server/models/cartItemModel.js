const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const Product = require("./productModel.js");


const { DataTypes } = Sequelize;


const CartItem = db.define("cartItems", {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

},
    {
        freezeTableName: true,
    }

)

Product.hasMany(CartItem)
CartItem.belongsTo(Product, { foreignKey: "productId" })


module.exports = CartItem