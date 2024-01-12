const express = require("express");


const {
    getAllBaner,
    postNewBaner
} = require("../controllers/banerController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");

const router = express.Router()

router.get('/allBaner', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllBaner)
router.post('/baner', verifyToken, authorize('ADMIN', 'OPERATOR'), postNewBaner)



module.exports = router