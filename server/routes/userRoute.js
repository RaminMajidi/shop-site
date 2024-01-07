const express = require("express");

const {
    getAllUser,
    getUserInfo,
    updateUserInfo
} = require("../controllers/userController.js")

const {
    patchUserInfoValidation
} = require("../lib/validations/userValidations.js")


const { verifyToken, authorize } = require("../middlewares/auth.js");



const router = express.Router()

router.get('/userList',verifyToken, authorize('ADMIN'), getAllUser)
router.patch('/user/info',verifyToken, authorize('ADMIN'), patchUserInfoValidation, updateUserInfo)
router.get('/user/:id',verifyToken, authorize('ADMIN'), getUserInfo)



module.exports = router