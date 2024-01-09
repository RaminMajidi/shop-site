const express = require("express");
const {
    getCategoryList,
    postAddCategory,
    getAllCategory,
    getCategoryById
} = require("../controllers/categoryController");
const {
    postCategoryValidation
} = require("../lib/validations/categoryValidations");

const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()


router.get('/categoryList', getCategoryList)
router.get('/allCategory', getAllCategory)
router.get('/Category/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), getCategoryById)
router.post('/addCategory', verifyToken, authorize('ADMIN', 'OPERATOR'), postCategoryValidation, postAddCategory)


module.exports = router