const { check } = require('express-validator')


const postCategoryValidation = [
    check("parentId")
        .custom((value, { req }) => {
            if (typeof (value) == 'number' || value === null) {
                return true
            }
            throw new Error("مقدار آیدی والد باید عدد باشد !")
        }).trim()
    ,
    check('title', ".فیلد نام اجباری است")
        .isString()
        .isLength({ min: 3, max: 60 })
        .withMessage(".عنوان باید حداقل 3 و حداکثر 60 کاراکتر باشد")
        .trim()
]


module.exports = {
    postCategoryValidation
}