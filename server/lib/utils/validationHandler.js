const { validationResult } = require('express-validator');

const validationHandler = async (req,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error()
        error.status = 400
        error.message = await errors.array().map(item => item.msg).join("")
        next(error)
        return false
    }
    return true
}

module.exports = { validationHandler }