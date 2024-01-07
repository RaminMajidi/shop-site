const { check } = require('express-validator')

const ROLS = ['ADMIN', 'OPERATOR', 'CUSTOMER']



const patchUserInfoValidation = [
    check("rol")
        .custom((value, { req }) => {
            if (ROLS.includes(value)) {
                return true
            }
            throw new Error("مقدار وارد شده سطح دسترسی نامعتبر است !")
        }),
    check('name', ".فیلد نام اجباری است")
        .isString()
        .isLength({ min: 3, max: 40 })
        .withMessage(".نام باید حداقل 3 و حداکثر 40 کاراکتر باشد"),
    check('email')
        .isEmail()
        .withMessage(".لطفا یک ایمیل معتبر وارد کنید")
]


module.exports = {
    patchUserInfoValidation
}