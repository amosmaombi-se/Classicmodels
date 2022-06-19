const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {allCustomers,singleCustomer,addCustomer,allOrders,singleOrder} = require('../controllers/customer');

router.get('/all',auth.authenticationToken,allCustomers);
router.get('/:customerNumber',auth.authenticationToken,singleCustomer);
router.post('/add',auth.authenticationToken,addCustomer);
router.get('/orders',allOrders);
router.get('/order/:orderNumber',auth.authenticationToken,singleOrder);


module.exports = router;