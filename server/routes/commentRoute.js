const express = require("express");
const {
    getCommentList,
    getCommentProduct,
    postComment,
    commentIsActive,
    deleteComment
} = require("../controllers/commentController.js");

const {
    postCommentValidation,
    patchCommentValidation
} = require("../lib/validations/commentValidation.js");

const { verifyToken, authorize } = require("../middlewares/auth.js");
const router = express.Router()

router.get('/comment/product', getCommentProduct)
router.get('/commentList', verifyToken, authorize('ADMIN', 'OPERATOR'), getCommentList)
router.post('/comment', verifyToken, authorize('CUSTOMER'), postCommentValidation, postComment)
router.patch('/comment/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), patchCommentValidation, commentIsActive)
router.delete('/comment/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), deleteComment)


module.exports = router