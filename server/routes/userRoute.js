const express = require("express");

const {
    getAllUser
} = require("../controllers/userController.js")


const router = express.Router()

router.get('/users',getAllUser)



module.exports = router