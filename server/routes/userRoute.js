const express = require("express");

const {
    getAllUser,
    signUpUser,
    signInUser,
    refreshToken,
    changeUserRol
} = require("../controllers/userController.js")

const {
    postSignUpValidation, postSignInValidation, patchRolValidation
} = require("../lib/validations/userValidations.js")


const { verifyToken } = require("../middlewares/verifyToken.js");
const { onlyAdmin } = require("../middlewares/verifyRol.js");


const router = express.Router()

router.get("/token", refreshToken)
router.get('/users', verifyToken, onlyAdmin, getAllUser)
router.post('/signup', postSignUpValidation, signUpUser)
router.post('/signin', postSignInValidation, signInUser)
router.patch('/user/changeRol', verifyToken, onlyAdmin, patchRolValidation, changeUserRol)



module.exports = router