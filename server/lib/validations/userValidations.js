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


const postAddUserValidation = [
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
        .withMessage(".لطفا یک ایمیل معتبر وارد کنید"),
    check('password')
        .isAlphanumeric()
        .isLength({ min: 5 })
        .withMessage(".رمز عبور باید حداقل 5 کاراکتر و ترکیبی از اعداد و حروف باشد")
        .trim(),
    check("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(".تکرار رمز عبور و رمز عبور همخوانی ندارد")
            }
            return true
        })
        .trim()
]


module.exports = {
    patchUserInfoValidation,
    postAddUserValidation
}