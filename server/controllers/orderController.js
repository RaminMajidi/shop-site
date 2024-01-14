const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Product = require("../models/productModel.js")
const path = require('path')
const fs = require('fs');
const Category = require("../models/categoryModel.js");
const User = require("../models/userModel.js");
const Order = require("../models/orderModel.js");
const OrderItem = require("../models/orderItemModel.js");


exports.getAllOrder = async (req, res, next) => {
    try {
        const count = await Order.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const orders = await Order.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
        })
        res.status(200).json({ orders, page, totalPage })
    } catch (error) {
        next(error)
    }
}

