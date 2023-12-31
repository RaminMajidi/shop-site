const { errorHandler } = require("./errorHandler");

const paginationHandler = (req, res, count) => {
    let limit = 5;
    const page = +req.query.page
    if (!page) {
        return errorHandler(res, 400, 'صفحه درخواست شده نامعتبر است !')
    }

    if (+req.query.limit > 5 && +req.query.limit <= 20) {
        limit = +req.query.limit
    }

    if (req.query.sort && req.query.sort != "asc" && req.query.sort != "desc") {
        return errorHandler(res, 400, 'درخواست مرتب سازی نامعتبر است !')
    }
    let sort = req.query.sort || "asc";
    let offset = ((page - 1) * limit);
    let totalPage = Math.ceil((count / limit))

    return { offset, page, limit, sort, totalPage }
}

module.exports = { paginationHandler };