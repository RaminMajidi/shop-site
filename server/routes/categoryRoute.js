const express = require("express");
const {
    getCategoryList,
    postAddCategory,
    getAllCategory,
    getCategoryById,
    deleletCategory,
    updateCategory,
    getMainCategores
} = require("../controllers/categoryController");
const {
    postCategoryValidation
} = require("../lib/validations/categoryValidations");

const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()


router.get('/categoryList', getCategoryList)
router.get('/allCategory',verifyToken, authorize('ADMIN', 'OPERATOR'), getAllCategory)
router.get('/mainCategores',verifyToken, authorize('ADMIN', 'OPERATOR'), getMainCategores)
router.get('/category/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), getCategoryById)
router.delete('/category/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), deleletCategory)
router.post('/addCategory', verifyToken, authorize('ADMIN', 'OPERATOR'), postCategoryValidation, postAddCategory)
router.patch('/updateCategory', verifyToken, authorize('ADMIN', 'OPERATOR'), postCategoryValidation, updateCategory)


module.exports = router