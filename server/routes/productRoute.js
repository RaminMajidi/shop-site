const express = require("express");

const {
    getAllProduct,
    postAddProduct
} = require("../controllers/productController.js");




const { verifyToken, authorize } = require("../middlewares/auth.js");
const { postProductValidation } = require("../lib/validations/productValidation.js");



const router = express.Router()

router.get('/allProduct', getAllProduct)
router.post('/addProduct', verifyToken, authorize('ADMIN', 'OPERATOR'), postProductValidation, postAddProduct)





module.exports = router