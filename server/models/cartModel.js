const { Sequelize } = require("sequelize");
const db = require("../config/DB.js");
const User = require("./userModel.js");



const { DataTypes } = Sequelize;


const Cart = db.define("carts", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
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
        validate: { max: 400 },
        allowNull: false
    },
    zip: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},
    {
        freezeTableName: true,
    }

)

User.hasMany(Cart)
Cart.belongsTo(User, { foreignKey: 'userId' })



module.exports = Cart