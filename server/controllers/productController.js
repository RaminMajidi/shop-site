const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Product = require("../models/productModel.js")
const path = require('path')
const fs = require('fs');
const Category = require("../models/categoryModel.js");



exports.getAllProduct = async (req, res, next) => {
    try {
        const count = await Product.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const products = await Product.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
            attributes: { exclude: ['userId', 'image', 'desc', 'createdAt', 'updatedAt'] },
            include: [{
                model: Category,
                attributes: ['id', 'title', 'parentId'],
            }],
        }
        )
        res.status(200).json({ products, page, totalPage })
    } catch (error) {
        next(error)
    }
}


exports.postAddProduct = async (req, res, next) => {
    try {
        const valid = await validationHandler(req, next)
        if (valid) {
            const userId = req.userId
            const { categoryId, title, desc, price, quantity } = req.body

            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            let dateNow = Math.round(Date.now())
            const fileName = dateNow + ext
            const url = `${req.protocol}://${req.get('host')}/images/products/${fileName}`;
            const allowedType = ['.jpg', '.jpeg', '.png']

            if (!allowedType.includes(ext.toLowerCase())) {
                return errorHandler(res, 401, 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg')
            }

            if (fileSize > 1000000) {
                return errorHandler(res, 406, 'حجم عکس نباید بیشتر از 1 مگابایت باشد')
            }

            file.mv(`./public/images/products/${fileName}`, async (err) => {
                if (err) {
                    return errorHandler(res, 501, err)
                }

                const product = await Product.create({
                    userId: userId,
                    categoryId: categoryId,
                    title: title,
                    desc: desc,
                    price: price,
                    quantity: quantity,
                    image: fileName,
                    url: url
                })
                res.status(200).json({ product, message: "محصول با موفقیت افزوده شد ." })
            })
        }
    } catch (error) {
        next(error)
    }
}