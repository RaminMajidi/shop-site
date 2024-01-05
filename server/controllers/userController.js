const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const path = require("path")
const fs = require("fs")
const { validationResult } = require('express-validator');
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { where } = require("sequelize");



exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "email", "url", "name", "rol"]
        })
        res.status(200).json({ users })
    } catch (error) {
        next(error)
    }
}


exports.signUpUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let message = await errors.array().map(item => item.msg).join("")
        return res.status(400).json({ message: message })
    }

    const { email, password } = req.body;
    try {
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
        })
        res.status(200).json({
            message: "ثبت نام موفقیت آمیز بود ", user: {
                email: newUser.email,
                rol: newUser.rol,
                id: newUser.id
            }
        })

    } catch (error) {
        next(error)
    }

}


exports.signInUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let message = await errors.array().map(item => item.msg).join("")
        return res.status(400).json({ message: message })
    }


    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            return errorHandler(res, 401, "ایمیل شما نامعتبر است!")
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return errorHandler(res, 401, "رمز عبور اشتباه است!")
        }

        const { id, name, rol, url } = user

        const accessToken = await jwt.sign(
            { id, name, email, rol },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )

        const refreshToken = await jwt.sign(
            { id, name, email, rol },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )

        await User.update(
            { refresh_token: refreshToken },
            { where: { id: id } }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            user: { id, name, email, rol, accessToken, url },
            message: "ورود موفقیت آمیز بود !"
        })

    } catch (error) {
        next(error)
    }

    res.status(200).json({ message: "ok" })

}

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return errorHandler(res, 401, "لطفا وارد حساب کاربری خود شوید !")
        }

        const user = await User.findOne({
            where: { refresh_token: refreshToken }
        })


        if (!user) {
            return errorHandler(res, 401, "لطفا وارد حساب کاربری خود شوید !")
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return errorHandler(res, 401, "نیاز به ورود مجدد !!")
            }

            const { id, name, email, rol, url } = user
            const accessToken = jwt.sign(
                { id, name, email, rol },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" }
            )
            res.status(200).json({ accessToken, url })
        })

    } catch (error) {
        next(error)
    }
}
