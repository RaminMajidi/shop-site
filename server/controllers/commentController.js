const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Comment = require("../models/commentModel.js");


exports.getCommentList = async (req, res, next) => {
    try {
        const count = await Comment.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const comments = await Comment.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
        })
        res.status(200).json({ comments, page, totalPage })

    } catch (error) {
        next(error)
    }
}


exports.getCommentProduct = async (req, res, next) => {
    try {
        const productId = req.query.id
        const comments = await Comment.findAll({
            where: { productId: productId, isActive: true },
            order: [['createdAt']],
        })
        res.status(200).json({ comments })
    } catch (error) {
        next(error)
    }
}


exports.postComment = async (req, res, next) => {
    try {
        const valid = validationHandler(req, next)
        if (valid) {
            const userName = req.userName
            const userId = req.userId
            const { productId, description, score } = req.body

            const comment = await Comment.findOne({
                where: { productId: productId, userId: userId }
            })
            if (comment) {
                return errorHandler(res, 403, "امکان ثبت نظر مجدد شما برای این محصول وجود ندارد !")
            }

            await Comment.create({
                productId: productId,
                userId: userId,
                userName: userName,
                description: description,
                score: score
            })

            res.status(201).json({ message: "نظر شما با موفقیت ارسال شد و بعد از تایید مدیریت به نمایش درخواهد آمد." })

        }
    } catch (error) {
        next(error)
    }
}


exports.commentIsActive = async (req, res, next) => {
    try {
        const valid = validationHandler(req, next)
        if (valid) {
            const id = req.params.id
            const { isActive } = req.body

            const comment = await Comment.findByPk(id)
            if (!comment) {
                return errorHandler(res, 404, "آیتمی یافت نشد !")
            }
            await Comment.update(
                { isActive: isActive },
                { where: { id: id } }
            )
            res.status(200).json({ message: "وضعیت نظر بروزرسانی شد ." })
        }

    } catch (error) {
        next(error)
    }
}


exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } })
        if (!comment) {
            return errorHandler(res, 404, "آیتمی یافت نشد !")
        }

        await Comment.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: "نظر با موفقیت حذف شد" })

    } catch (error) {
        next(error)
    }
}