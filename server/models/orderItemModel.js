const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");
const Order = require("./orderModel.js");
const Product = require("./productModel.js");


const { DataTypes } = Sequelize;


const OrderItem = db.define("orderItems", {
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

Order.hasOne(OrderItem)
OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product,{foreignKey:"productId"})


module.exports = OrderItem