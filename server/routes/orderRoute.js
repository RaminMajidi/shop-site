const express = require("express");

const {
    getAllOrder,
    postNewOrder,
    getOredrById,
    getPayment
} = require("../controllers/orderController.js");

const { verifyToken, authorize } = require("../middlewares/auth.js");
const { newOrderValidation } = require("../lib/validations/orderValidation.js");

const router = express.Router()

router.get('/allOrder', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllOrder)
router.get('/order/:userId/:orderId', verifyToken, authorize('ADMIN', 'OPERATOR'), getOredrById)
router.post('/newOrder', verifyToken, authorize('CUSTOMER'), newOrderValidation, postNewOrder)
router.get('/payment/:id', verifyToken, authorize('CUSTOMER'), getPayment)

module.exports = router