const express = require("express");


const {
    getAllBaner,
    postNewBaner,
    updateBaner
} = require("../controllers/banerController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const { banerValidation } = require("../lib/validations/banerValidation.js");

const router = express.Router()

router.get('/allBaner', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllBaner)
router.post('/baner', verifyToken, authorize('ADMIN', 'OPERATOR'), banerValidation, postNewBaner)
router.put('/baner/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), banerValidation, updateBaner)



module.exports = router