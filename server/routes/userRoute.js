const express = require("express");

const {
    getAllUser,
    signUpUser,
    signInUser,
    refreshToken,
    updateUserInfo
} = require("../controllers/userController.js")

const {
    postSignUpValidation,
    postSignInValidation,
    patchUserInfoValidation
} = require("../lib/validations/userValidations.js")


const { verifyToken, authorize } = require("../middlewares/auth.js");



const router = express.Router()

router.get("/token", refreshToken)
router.post('/signup', postSignUpValidation, signUpUser)
router.post('/signin', postSignInValidation, signInUser)
router.get('/users', verifyToken, authorize('ADMIN'), getAllUser)
router.patch('/user/info', verifyToken, authorize('ADMIN'), patchUserInfoValidation, updateUserInfo)



module.exports = router