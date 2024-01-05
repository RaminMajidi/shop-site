const express = require("express");

const {
    getAllUser,
    signUpUser,
    signInUser,
    refreshToken
} = require("../controllers/userController.js")

const {
    postSignUpValidation, postSignInValidation
} = require("../lib/validations/userValidations.js")

const router = express.Router()

router.get("/token", refreshToken)
router.get('/users', getAllUser)
router.post('/signup', postSignUpValidation, signUpUser)
router.post('/signin', postSignInValidation, signInUser)



module.exports = router