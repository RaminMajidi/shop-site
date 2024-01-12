const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Category = require("../models/categoryModel.js");
const { Op } = require("sequelize")


exports.getCategoryList = async (req, res, next) => {
    try {
        const count = await Category.count()

        if (!count) {
            return res.status(200).json({ categores: [] })
        }

        const categores = await Category.findAll({
            where: { parentId: { [Op.is]: null } },
            include: [{
                where: { id: { [Op.is]: true } },
                model: Category,
                as: "children",
                attributes: ['id', 'title'],
            }],
            attributes: ['id', 'title', 'parentId']
        })
        res.status(200).json({ categores })

    } catch (error) {
        next(error)
    }
}


exports.getAllCategory = async (req, res, next) => {
    try {
        const count = await Category.count()
        if (!count) {
            return res.status(200).json({ page: 0, totalPage: 0, categores: [] })
        }
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const categores = await Category.findAll({
            offset: offset,
            limit: limit,
            order: [['id', sort]],

            attributes: ['id', 'title', 'parentId']
        })
        res.status(200).json({ categores, page, totalPage })

    } catch (error) {
        next(error)
    }
}


exports.getCategoryById = async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await Category.findByPk(id)
        res.status(200).json({ category })
    } catch (error) {
        next(error)
    }
}


exports.getMainCategores = async (req, res, next) => {
    try {
        const mainCategores = await Category.findAll({
            where: { parentId: { [Op.is]: null } }
        })
        res.status(200).json({ mainCategores })

    } catch (error) {
        next(error)
    }
}

exports.deleletCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Category.destroy({ where: { id: id } })
        if (result) {
            return res.status(200).json({ message: "حذف دسته بندی با موفقیت انجام شد !" })
        }
        res.status(400).json({ message: "دیتای ارسالی نامعتبر است !" })
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

            if (parentId) {
                const checkParent = await Category.findOne({
                    where: { id: parentId, parentId: { [Op.is]: true } }
                })
                if (checkParent) {
                    return res.status(400).json({ message: "دسته والد نامعتبر است !" })
                }
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


exports.updateCategory = async (req, res, next) => {
    try {
        const valid = await validationHandler(req, next)

        if (valid) {
            const { id, title, parentId } = req.body

            const found = await Category.findOne({ where: { title: title } })

            if (found && found.id != id) {
                return errorHandler(res, 400, "دسته بندی تکراری است !")
            }

            if (parentId) {
                const checkParent = await Category.findOne({
                    where: { id: parentId, parentId: { [Op.is]: true } }
                })
                if (checkParent) {
                    return res.status(400).json({ message: "دسته والد نامعتبر است !" })
                }
            }

            let qury
            parentId ? qury = { title: title, parentId: +parentId } : qury = { title: title }
            const category = await Category.update(qury, { where: { id: id } })

            res.status(200).json({ message: "دسته بندی با موفقیت بروزرسانی شد ." })
        }
    } catch (error) {
        next(error)
    }
}