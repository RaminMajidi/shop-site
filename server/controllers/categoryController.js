const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Category = require("../models/categoryModel.js");



exports.getCategoryList = async (req, res, next) => {
    try {
        const count = await Category.count()

        if (!count) {
            return res.status(200).json({ categores: [] })
        }


        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const categores = await Category.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
            // include: [{
            //     model: Category,
            //     as: "children",
            //     attributes: ['title']
            // }]
        })
        res.status(200).json({ categores, page, totalPage })

    } catch (error) {
        next(error)
    }
}

exports.postAddCategory = async (req, res, next) => {

    try {
        const valid = await validationHandler(req, next)

        if (valid) {
            const { title, parentId } = req.body

            const found = await Category.findOne({ where: { title: title } })

            if (found) {
                return errorHandler(res, 400, "دسته بندی تکراری است !")
            }

            let qury
            parentId ? qury = { title: title, parentId: +parentId } : qury = { title: title }
            const category = await Category.create(qury)

            res.status(200).json({ category, message: "دسته بندی با موفقیت افزوده شد ." })
        }


    } catch (error) {
        next(error)
    }
}