const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {getAllOrders,getOrderByProduct,updateOrder,deleteOrder,createOrder} = require('../controllers/order');

router.post('/createOrder',auth.authenticationToken,createOrder);
router.get('/all',auth.authenticationToken,getAllOrders);
router.get('/:orderNumber/:productCode',auth.authenticationToken,getOrderByProduct);
router.post('/update/:orderNumber',auth.authenticationToken,updateOrder);
router.post('/delete/:orderNumber',auth.authenticationToken,deleteOrder);


module.exports = router;