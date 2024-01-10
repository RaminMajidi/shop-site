const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Product = require("../models/productModel.js")
const path = require('path')
const fs = require('fs');
const Category = require("../models/categoryModel.js");
const User = require("../models/userModel.js");
const { where } = require("sequelize");


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


exports.getProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            where: { id: id },
            attributes: { exclude: ['userId', 'image', 'createdAt', 'updatedAt'] },
            include: [{
                model: Category,
                attributes: ['id', 'title', 'parentId'],
            }]
        })
        res.status(200).json({ product })
    } catch (error) {
        next(error)
    }
}


exports.getProductByCatId = async (req, res, next) => {
    try {
        const catId = req.params.id
        const products = await Product.findAll({
            where: { categoryId: catId },
            attributes: { exclude: ['userId', 'image', 'createdAt', 'updatedAt'] },
            include: [{
                model: Category,
                attributes: ['id', 'title', 'parentId'],
            }]
        })
        res.status(200).json({ products })
    } catch (error) {
        next(error)
    }
}


exports.getProductInfo = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            where: { id: id },
            include: [{
                model: Category,
                attributes: ['id', 'title', 'parentId'],
            },
            {
                model: User,
                attributes: ['id', 'name', 'rol'],
            }
            ]
        })
        res.status(200).json({ product })
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


exports.updateProduct = async (req, res, next) => {
    try {
        const valid = await validationHandler(req, next)
        if (valid) {
            const productId = req.params.id

            const product = await Product.findByPk(productId)
            if (!product) {
                return errorHandler(res, 404, "محصولی یافت نشد !")
            }
            const userId = req.userId
            const { categoryId, title, desc, price, quantity } = req.body

            await Product.update({
                userId: userId,
                categoryId: categoryId,
                title: title,
                desc: desc,
                price: price,
                quantity: quantity
            },
                {
                    where: { id: productId }
                }
            )
            res.status(200).json({ message: "بروزرسانی محصول با موفقیت انجام شد" })
        }

    } catch (error) {
        next(error)
    }
}


exports.updateProductImg = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findByPk(productId)
        if (!product) {
            return errorHandler(res, 404, "محصول یافت نشد !")
        }

        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        let dateNow = Math.round(Date.now())
        const fileName = dateNow + ext
        const allowedType = ['.jpg', '.jpeg', '.png']

        if (!allowedType.includes(ext.toLowerCase())) {
            return errorHandler(res, 401, 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg')
        }

        if (fileSize > 1000000) {
            return errorHandler(res, 406, 'حجم عکس نباید بیشتر از 1 مگابایت باشد')
        }

        const filePath = `./public/images/products/${product.image}`
        fs.unlinkSync(filePath)
        file.mv(`./public/images/products/${fileName}`, async (err) => {
            if (err) {
                return errorHandler(res, 501, err)
            }
        })

        const userId = req.userId
        const url = `${req.protocol}://${req.get('host')}/images/products/${fileName}`;

        await Product.update({
            userId: userId,
            image: fileName,
            url: url
        },
            {
                where: { id: productId }
            }
        )

        res.status(200).json({ message: "عکس محصول بروزرسانی شد ." })

    } catch (error) {
        next(error)
    }
}