const errorHandler = (res, status, message) => {
    return res.status(status).json({ message });
};

module.exports = { errorHandler };