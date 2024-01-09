const express = require("express");





const { verifyToken, authorize } = require("../middlewares/auth.js");
const { getAllProduct } = require("../controllers/productController.js");



const router = express.Router()

router.get('/allProduct', getAllProduct)





module.exports = router