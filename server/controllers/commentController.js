const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const Product = require("../models/productModel.js")
const path = require('path')
const fs = require('fs');
const Category = require("../models/categoryModel.js");
const User = require("../models/userModel.js");
const Comment = require("../models/commentModel.js")



exports.getCommentList = async (req, res, next) => {
    try {
        const count = await Comment.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const comments = await Comment.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
        })
        res.status(200).json({ comments, page, totalPage })

    } catch (error) {
        next(error)
    }
}