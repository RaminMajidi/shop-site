const express = require("express");

const {
    getAllProduct,
    postAddProduct,
    getProductById,
    getProductInfo,
    getProductByCatId,
    updateProduct,
    updateProductImg
} = require("../controllers/productController.js");




const { verifyToken, authorize } = require("../middlewares/auth.js");
const { postProductValidation } = require("../lib/validations/productValidation.js");



const router = express.Router()

router.get('/allProduct', getAllProduct)
router.get('/product/:id', getProductById)
router.get('/products/category/:id', getProductByCatId)
router.get('/productInfo/:id',verifyToken, authorize('ADMIN', 'OPERATOR'), getProductInfo)
router.post('/addProduct', verifyToken, authorize('ADMIN', 'OPERATOR'), postProductValidation, postAddProduct)
router.put('/updateProduct/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), postProductValidation, updateProduct)
router.patch('/product/img/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), updateProductImg)





module.exports = router