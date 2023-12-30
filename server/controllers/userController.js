const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const path = require("path")
const fs = require("fs")
const { validationResult } = require('express-validator');
const { errorHandler } = require("../lib/utils/errorHandler.js")


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


exports.signupUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let message = await errors.array().map(item => item.msg).join("")
        return res.status(400).json({ message: message })
    }

    const { email, password, confirmPassword } = req.body;
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
            password:hashPassword,
        })
        res.status(200).json({ message: "ثبت نام موفقیت آمیز بود " })

    } catch (error) {
        next(error)
    }

}


