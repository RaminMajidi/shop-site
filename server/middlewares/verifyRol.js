const { errorHandler } = require("../lib/utils/errorHandler.js")



exports.onlyAdmin = async (req, res, next) => {
    const rol = req.userRol
    if (rol != "ADMIN") {
        return errorHandler(res, 403, "شما مجوز دسترسی به این صفحه را ندارید")
    }
    next()
}