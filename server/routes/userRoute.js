const express = require("express");

const {
    getAllUser,
    signupUser
} = require("../controllers/userController.js")

const {
    postSignupValidation
} = require("../lib/validations/userValidations.js")

const router = express.Router()

router.get('/users', getAllUser)
router.post('/signup', postSignupValidation,signupUser)



module.exports = router