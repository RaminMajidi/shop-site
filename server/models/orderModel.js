const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");



const { DataTypes } = Sequelize;


const Order = db.define("orders", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('REGISTERED','PAID', 'CANCELED', 'DELIVERED'),
        defaultValue: 'REGISTERED',
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    refId: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    zip: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        freezeTableName: true,
    }

)

User.hasMany(Order)
Order.belongsTo(User, { foreignKey: 'userId' })



module.exports = Order