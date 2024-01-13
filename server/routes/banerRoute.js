const express = require("express");


const {
    getAllBaner,
    postNewBaner,
    updateBaner,
    getBanerList,
    deleteBaner
} = require("../controllers/banerController.js");


const { verifyToken, authorize } = require("../middlewares/auth.js");
const { banerValidation } = require("../lib/validations/banerValidation.js");

const router = express.Router()

router.get('/banerList', getBanerList)
router.get('/allBaner', verifyToken, authorize('ADMIN', 'OPERATOR'), getAllBaner)
router.post('/baner', verifyToken, authorize('ADMIN', 'OPERATOR'), banerValidation, postNewBaner)
router.put('/updateBaner/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), banerValidation, updateBaner)
router.delete('/deleteBaner/:id', verifyToken, authorize('ADMIN', 'OPERATOR'), deleteBaner)



module.exports = router