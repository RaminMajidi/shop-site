const { validationHandler } = require("../lib/utils/validationHandler.js")
const { errorHandler } = require("../lib/utils/errorHandler.js");
const { paginationHandler } = require("../lib/utils/paginationHandler.js")
const path = require('path')
const fs = require('fs');
const Baner = require("../models/BanerModel.js")


exports.getAllBaner = async (req, res, next) => {
    try {
        const count = await Baner.count()
        const { page, limit, sort, offset, totalPage } = paginationHandler(req, res, count)
        const baners = await Baner.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', sort]],
        }
        )
        res.status(200).json({ baners, page, totalPage })

    } catch (error) {
        next(error)
    }
}