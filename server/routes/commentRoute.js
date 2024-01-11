const express = require("express");
const {
    getCommentList
} = require("../controllers/commentController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const router = express.Router()

router.get('/commentList',verifyToken,authorize('ADMIN','OPERATOR'), getCommentList)


module.exports = router