const Jwt = require("jsonwebtoken");
const { errorHandler } = require("../lib/utils/errorHandler.js");


exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    if (token === null) {
        return errorHandler(res, 401, "ابتدا واردحساب کاربری خود شوید!")
    }

    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return errorHandler(res, 403, "شما مجوز دسترسی به این صفحه را ندارید")
        }

        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next()
    })

}
