const { check } = require('express-validator')


const postSignUpValidation = [
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

const postSignInValidation = [
    check('email')
        .isEmail()
        .withMessage(".لطفا یک ایمیل معتبر وارد کنید"),
    check('password')
        .isAlphanumeric()
        .isLength({ min: 5 })
        .withMessage(".رمز عبور باید حداقل 5 کاراکتر باشد")
        .trim(),
]


module.exports = {
    postSignUpValidation,
    postSignInValidation
}