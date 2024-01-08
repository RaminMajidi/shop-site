const { check } = require('express-validator')


const postCategoryValidation = [
    check('title', ".فیلد نام اجباری است")
        .isString()
        .isLength({ min: 3, max: 60 })
        .withMessage(".عنوان باید حداقل 3 و حداکثر 60 کاراکتر باشد")
        .trim()
]


module.exports = {
    postCategoryValidation
}