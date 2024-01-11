const express = require("express");
const {
    getCommentList,
    getCommentProduct
} = require("../controllers/commentController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const router = express.Router()

router.get('/commentList',verifyToken,authorize('ADMIN','OPERATOR'), getCommentList)
router.get('/comment/product', getCommentProduct)


module.exports = router