const express = require("express");

const {
    signUpUser,
    signInUser,
    refreshToken,
} = require("../controllers/authController");
const {
    postSignUpValidation,
    postSignInValidation
} = require("../lib/validations/authValidations");


const router = express.Router()


router.get("/token", refreshToken)
router.post('/signup', postSignUpValidation, signUpUser)
router.post('/signin', postSignInValidation, signInUser)


module.exports = router