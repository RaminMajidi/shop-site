const express = require("express");

const {
    getAllOrder,
    postNewOrder,
    getOredrById
} = require("../controllers/orderController.js");

const { verifyToken, authorize } = require("../middlewares/auth.js");
const { newOrderValidation } = require("../lib/validations/orderValidation.js");

const router = express.Router()

router.get('/allOrder', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllOrder)
router.get('/order/:userId/:orderId', verifyToken, authorize('ADMIN', 'OPERATOR'), getOredrById)
router.post('/newOrder', verifyToken, authorize('CUSTOMER'), newOrderValidation, postNewOrder)

module.exports = router