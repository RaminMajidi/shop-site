const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");
const OrderItem = require("./orderItemModel.js");


const { DataTypes } = Sequelize;


const Order = db.define("orders", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('REGISTERED', 'CANCELED', 'DELIVERED'),
        defaultValue: 'REGISTERED'
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    refId: {
        type: DataTypes.STRING,
    }
},
    {
        freezeTableName: true,
    }

)

User.hasMany(Order)
Order.belongsTo(User, { foreignKey: 'userId' })



module.exports = Order