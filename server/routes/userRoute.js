const express = require("express");

const {
    getAllUser,
    getUserInfo,
    deleteUser,
    updateUserInfo
} = require("../controllers/userController.js")

const {
    patchUserInfoValidation
} = require("../lib/validations/userValidations.js")


const { verifyToken, authorize } = require("../middlewares/auth.js");



const router = express.Router()

router.get('/userList',verifyToken, authorize('ADMIN'), getAllUser)
router.get('/user/:id',verifyToken, authorize('ADMIN'), getUserInfo)
router.delete('/user/:id',verifyToken, authorize('ADMIN'), deleteUser)
router.patch('/user/info',verifyToken, authorize('ADMIN'), patchUserInfoValidation, updateUserInfo)



module.exports = router