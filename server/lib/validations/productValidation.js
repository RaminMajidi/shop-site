const { check } = require('express-validator')



const postProductValidation = [
    check("categoryId")
        .isNumeric()
        .withMessage("دسته بندی اجباری است !"),
    check("title")
        .isString()
        .isLength({ min: 5, max: 100 })
        .withMessage("عنوان باید حداقل 5 و حداکثر شامل 100 کاراکتر باشد !"),
    check("desc")
        .isString()
        .isLength({ min: 20, max: 2000 })
        .withMessage(" توضیحات باید حداقل 20 و حداکثر شامل 2000 کاراکتر باشد !"),
    check("price")
        .isNumeric()
        .withMessage("قیمت اجباری است!(ریال)"),
    check("quantity")
        .isInt()
        .withMessage("تعداد محصول به عدد اجباری است !"),
]


module.exports = {
    postProductValidation
}