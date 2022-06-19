const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {getAllPayments,getAllPaymentsByCustomer,getAllPaymentsByOrder} = require('../controllers/payment');

router.get('/all',getAllPayments); 
router.get('/:customerNumber',getAllPaymentsByCustomer); 
router.get('/:customerNumber/:OrderNumber',getAllPaymentsByOrder); 


module.exports = router;