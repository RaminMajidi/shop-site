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


exports.getBanerList = async (req, res, next) => {
    try {
        let limit = +req.query.limit < 20 ? +req.query.limit : +req.query.limit > 20 ? 20 : 20
        const baners = await Baner.findAll({
            limit: limit,
        }
        )
        res.status(200).json({ baners })

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

                const baner = await Baner.create({
                    title: title,
                    image: fileName,
                    url: url,
                    isActive: isActive
                })
                res.status(201).json({ baner, message: "بنر با موفقیت افزوده شد ." })
            })
        }

    } catch (error) {
        next(error)
    }
}


exports.updateBaner = async (req, res, next) => {
    try {
        const valid = await validationHandler(req, next)

        if (valid) {
            const banerId = req.params.id
            const baner = await Baner.findByPk(banerId)

            if (!baner) {
                return errorHandler(res, 404, "آیتمی یافت نشد !")
            }

            let fileName = ""
            if (req.files === null) {
                fileName = baner.image
            } else {
                const file = req.files.file
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                let dateNow = Math.round(Date.now())
                fileName = dateNow + ext
                const allowedType = ['.jpg', '.jpeg', '.png']

                if (!allowedType.includes(ext.toLowerCase())) {
                    return errorHandler(res, 401, 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg')
                }

                if (fileSize > 1000000) {
                    return errorHandler(res, 406, 'حجم عکس نباید بیشتر از 1 مگابایت باشد')
                }
                const filePath = `./public/images/baners/${baner.image}`
                fs.unlinkSync(filePath)
                file.mv(`./public/images/baners/${fileName}`, async (err) => {
                    if (err) {
                        return errorHandler(res, 501, err)
                    }
                })
            }

            const { title, isActive } = req.body
            const url = `${req.protocol}://${req.get('host')}/images/baners/${fileName}`;
            await Baner.update({
                title: title,
                image: fileName,
                isActive: isActive,
                url: url
            }, { where: { id: banerId } })
            res.status(201).json({ message: "بنر با موفقیت بروزرسانی شد !" })
        }

    } catch (error) {

    }
}


exports.deleteBaner = async (req, res, next) => {
    try {
        const banerId = req.params.id
        const baner = await Baner.findByPk(banerId)
        if (!baner) {
            return errorHandler(res, 404, "آیتمی یافت نشد !")
        }
        const filePath = `./public/images/baners/${baner.image}`
        fs.unlinkSync(filePath)
        await Baner.destroy({ where: { id: banerId } })
        res.status(200).json({ message: "بنر با موفقیت حذف شد !" })
    } catch (error) {
        next(error)
    }
}