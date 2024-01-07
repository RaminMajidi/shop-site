const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")
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

exports.getUserInfo = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await User.findOne({
            where: { id: id },
            attributes: { exclude: ['password', 'refresh_token'] }
        })

        user ?
            res.status(200).json({ user })
            :
            res.status(404).json({ message: "کاربری یافت نشد !" })

    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } })
        if (!user) {
            return errorHandler(res, 404, "کاربری یافت نشد !")
        }

        await User.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: "کاربر با موفقیت حذف شد" })

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

exports.postAddUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let message = await errors.array().map(item => item.msg).join("")
        return res.status(400).json({ message: message })
    }
    try {


        const { email, password, name } = req.body;
     
            const found = await User.findOne({
                where: {
                    email: email
                }
            })

            if (found) {
                return errorHandler(res, 406, "ایمیل تکراری است")
            }

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                email: email,
                password: hashPassword,
                name: name
            })
            res.status(200).json({
                message: "ثبت نام موفقیت آمیز بود ", user: {
                    email: newUser.email,
                    rol: newUser.rol,
                    id: newUser.id,
                    name: newUser.name
                }
            })

        } catch (error) {
            next(error)
        }
    }