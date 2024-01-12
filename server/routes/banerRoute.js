const express = require("express");


const {
    getAllBaner
} = require("../controllers/banerController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()

router.get('/allBaner', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllBaner)



module.exports = router