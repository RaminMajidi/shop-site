const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Product = require("../models/productModel.js")





exports.getAllProduct = async (req, res, next) => {
    try {
        const count = await Product.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const products = await Product.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
        })
        res.status(200).json({ products, page, totalPage })
    } catch (error) {
        next(error)
    }
}


