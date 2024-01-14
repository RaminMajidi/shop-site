const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");


const { DataTypes } = Sequelize;


const Order = db.define("orders", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('REGISTERED', 'CANCELED', 'DELIVERED'),
        defaultValue: 'REGISTERED'
    },

},
    {
        freezeTableName: true,
    }

)

User.hasMany(Order)
Order.belongsTo(User, { foreignKey: 'userId' })


module.exports = Order