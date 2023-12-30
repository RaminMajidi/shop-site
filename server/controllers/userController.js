const USERS = require("../models/userModel.js")


async function getAllUser(req, res, next) {
    try {
        const users = await USERS.findAll({})
        res.status(200).json({users})

    } catch (error) {
        next(error)
    }
}


module.exports={
    getAllUser
}