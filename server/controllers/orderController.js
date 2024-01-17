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

        const checkOrder = await Order.findOne({
            where: { userId: req.userId, status: 'REGISTERED' }
        })

        if (checkOrder) {
            return errorHandler(res, 400, "شما سفارش پرداخت نشده دارید ابتدا وضعیت آن را مشخص و مجددا سفارش ثبت کنید !")
        }

        const valid = await validationHandler(req, next)
        if (valid) {
            let whereId = []
            for (let q in req.body.products) {
                whereId.push(req.body.products[q].productId)
            }

            const products = await Product.findAll({
                where: { id: { [Op.or]: whereId } },
                attributes: ['id', 'price', 'quantity']
            })

            let totatPrice = 0
            products.map((item, index) => {
                totatPrice += req.body.products[index].quantity * item.price
            })

            const { state, city, address, zip } = req.body

            const newOrder = await Order.create({
                userId: req.userId,
                totalPrice: totatPrice,
                state: state,
                city: city,
                address: address,
                zip: zip
            })

            let items = []
            await req.body.products.map((item, index) => {
                let obj = {
                    orderId: newOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: products[index].price
                }
                items.push(obj)
            })

            await OrderItem.bulkCreate(items)

            res.status(201).json({ message: "سفارش با موفقیت ثبت شد ." })
        }
    } catch (error) {
        next(error)
    }
}

