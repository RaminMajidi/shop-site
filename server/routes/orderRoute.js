const express = require("express");

const {
    getAllOrder
} = require("../controllers/orderController.js");

const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()

router.get('/allOrder', getAllOrder)

module.exports = router