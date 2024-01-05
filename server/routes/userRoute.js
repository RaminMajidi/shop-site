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


const { verifyToken } = require("../middlewares/verifyToken.js")


const router = express.Router()

router.get("/token", refreshToken)
router.get('/users', verifyToken, getAllUser)
router.post('/signup', postSignUpValidation, signUpUser)
router.post('/signin', postSignInValidation, signInUser)



module.exports = router