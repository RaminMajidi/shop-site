const User = require("../models/userModel.js")
const { validationResult } = require('express-validator');
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")


exports.getAllUser = async (req, res, next) => {

    try {
        const count = await User.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const users = await User.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
            attributes: ["id", "email", "name", "rol"]
        })
        res.status(200).json({ users, page, totalPage })
    } catch (error) {
        next(error)
    }
}

exports.updateUserInfo = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let message = await errors.array().map(item => item.msg).join("")
        return res.status(400).json({ message: message })
    }

    try {
        const { id, rol, name, email } = req.body

        const user = await User.findOne({
            where: { id: id }
        })

        if (!user) {
            return errorHandler(res, 404, "کاربری یافت نشد !")
        }

        await User.update(
            { rol: rol, name: name, email: email },
            { where: { id: id } }
        )

        res.status(200).json({ message: "بروزرسانی موفقیت آمیز بود" })

    } catch (error) {
        next(error)
    }

}