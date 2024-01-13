const { check } = require('express-validator')



const banerValidation = [
    check("isActive")
        .isBoolean()
        .withMessage("حالت باید از نوع Boolean  باشد !"),
    check("title")
        .isString()
        .isLength({ min: 5, max: 100 })
        .withMessage("عنوان باید حداقل 5 و حداکثر شامل 100 کاراکتر باشد !")
        .trim()
]


module.exports = {
    banerValidation
}