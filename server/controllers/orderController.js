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
const { Op } = require("sequelize")

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


exports.getOredrById = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params
        const order = await Order.findOne({
            where: { id: orderId, userId: userId }
        })
        if (!order) {
            return errorHandler(res, 404, "آیتمی یافت نشد !")
        }
        res.status(200).json({ order })

    } catch (error) {
        error
    }
}


exports.postNewOrder = async (req, res, next) => {
    try {
        var whereId = []
        for (let q in req.body) {
            whereId.push(req.body[q].productId)
        }

        const products = await Product.findAll({
            where: { id: { [Op.or]: whereId } },
            attributes: ['id', 'price', 'quantity']
        })

        let totatPrice = 0
        products.map((item, index) => {
            totatPrice += req.body[index].quantity * item.price
        })
        res.status(201).json({ products, totatPrice, message: "سفارش با موفقیت ثبت شد ." })

    } catch (error) {
        next(error)
    }
}

