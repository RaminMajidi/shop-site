const express = require("express");
const {
    getCommentList
} = require("../controllers/commentController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const router = express.Router()

router.get('/commentList', getCommentList)


module.exports = router