const express = require("express");
const {
    getCommentList,
    getCommentProduct,
    postComment
} = require("../controllers/commentController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const { postCommentValidation } = require("../lib/validations/commentValidation.js");
const router = express.Router()

router.get('/commentList', verifyToken, authorize('ADMIN', 'OPERATOR'), getCommentList)
router.get('/comment/product', getCommentProduct)
router.post('/comment', verifyToken, authorize('CUSTOMER'),postCommentValidation, postComment)


module.exports = router