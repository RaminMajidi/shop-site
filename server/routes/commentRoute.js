const express = require("express");
const {
    getCommentList,
    getCommentProduct,
    postComment,
    commentIsActive
} = require("../controllers/commentController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const { postCommentValidation, patchCommentValidation } = require("../lib/validations/commentValidation.js");
const router = express.Router()

router.get('/comment/product', getCommentProduct)
router.get('/commentList', verifyToken, authorize('ADMIN', 'OPERATOR'), getCommentList)
router.post('/comment', verifyToken, authorize('CUSTOMER'), postCommentValidation, postComment)
router.patch('/comment', verifyToken, authorize('ADMIN', 'OPERATOR'), patchCommentValidation,commentIsActive)


module.exports = router