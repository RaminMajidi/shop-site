const express = require("express");

const {
    getAllOrder,
    postNewOrder
} = require("../controllers/orderController.js");

const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()

router.get('/allOrder', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllOrder)
router.post('/newOrder', verifyToken, authorize('CUSTOMER'), postNewOrder)

module.exports = router