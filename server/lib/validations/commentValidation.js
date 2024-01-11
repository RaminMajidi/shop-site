const { check } = require('express-validator')



const postCommentValidation = [
    check("productId")
        .isNumeric()
        .withMessage("آیدی محصول اجباری است !"),
    check("description")
        .isString()
        .isLength({ min: 10, max: 200 })
        .withMessage(" توضیحات باید حداقل 10 و حداکثر شامل 200 کاراکتر باشد !"),
    check("score")
        .isInt({ min: 1, max: 5 })
        .withMessage("ثبت امتیاز بین 1تا5 اجباری است !"),
]

const patchCommentValidation = [
    check("isActive")
        .isBoolean()
        .withMessage("وضعیت باید دارای یکی از مقادیر true  یا  false  باشد ."),
]


module.exports = {
    postCommentValidation,
    patchCommentValidation
}