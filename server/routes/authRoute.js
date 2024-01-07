const express = require("express");

const {
    signUpUser,
    signInUser,
    refreshToken,
    signOutUser,
} = require("../controllers/authController");
const {
    postSignUpValidation,
    postSignInValidation
} = require("../lib/validations/authValidations");


const router = express.Router()


router.get("/token", refreshToken)
router.post('/signUp', postSignUpValidation, signUpUser)
router.post('/signIn', postSignInValidation, signInUser)
router.get('/signOut', postSignInValidation, signOutUser)


module.exports = router