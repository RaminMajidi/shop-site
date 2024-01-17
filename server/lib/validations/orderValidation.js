const { check } = require('express-validator')

const ROLS = ['ADMIN', 'OPERATOR', 'CUSTOMER']




const newOrderValidation = [
    check("products")
        .isArray()
        .withMessage("محصولات باید به صورت آرایه ارسال شوند ."),
    check('state', ".فیلد استان اجباری است")
        .isString()
        .isLength({ min: 2, max: 40 })
        .withMessage(".استان باید حداقل 2 و حداکثر 40 کاراکتر باشد")
        .trim(),
    check('city')
        .isString()
        .isLength({ min: 2, max: 40 })
        .withMessage(".شهر باید حداقل 2 و حداکثر 40 کاراکتر باشد")
        .trim(),
    check('address')
        .isString()
        .isLength({ min: 2, max: 400 })
        .withMessage(".آدرس باید حداقل 2 و حداکثر 400 کاراکتر باشد")
        .trim(),
    check('zip')
        .isNumeric()
        .isLength({ min: 10, max: 15 })
        .withMessage(".کدپستی باید حداقل 10 و حداکثر 15 کاراکتر باشد")
        .trim(),
]


module.exports = {
    newOrderValidation
}