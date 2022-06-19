const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {getAllOffices,getSingleOffice,updateOffice,deleteOffice,createOffice} = require('../controllers/office');

router.post('/createOffice',auth.authenticationToken,createOffice);
router.get('/all',auth.authenticationToken,getAllOffices);
router.get('/:officeCode',auth.authenticationToken,getSingleOffice);
router.post('/update/:officeCode',auth.authenticationToken,updateOffice);
router.post('/delete/:officeCode',auth.authenticationToken,deleteOffice);


module.exports = router;