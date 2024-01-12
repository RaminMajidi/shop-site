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


exports.postNewBaner = async (req, res, next) => {
    try {

        const valid = await validationHandler(req, next)
        if (valid) {
            const { title, isActive } = req.body

            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            let dateNow = Math.round(Date.now())
            const fileName = dateNow + ext
            const url = `${req.protocol}://${req.get('host')}/images/baners/${fileName}`;
            const allowedType = ['.jpg', '.jpeg', '.png']

            if (!allowedType.includes(ext.toLowerCase())) {
                return errorHandler(res, 401, 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg')
            }

            if (fileSize > 1000000) {
                return errorHandler(res, 406, 'حجم عکس نباید بیشتر از 1 مگابایت باشد')
            }

            file.mv(`./public/images/baners/${fileName}`, async (err) => {
                if (err) {
                    return errorHandler(res, 501, err)
                }

                const product = await Baner.create({
                    title: title,
                    image: fileName,
                    url: url,
                    isActive: isActive
                })
                res.status(200).json({ product, message: "بنر با موفقیت افزوده شد ." })
            })
        }

    } catch (error) {
        next(error)
    }
}