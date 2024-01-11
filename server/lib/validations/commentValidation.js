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


module.exports = {
    postCommentValidation
}