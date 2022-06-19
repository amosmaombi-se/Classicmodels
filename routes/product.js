const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const { productLine,
        productLines, 
        addProductLine, 
        updateProductLine, 
        allProducts, 
        singleProduct, 
        addProducts, 
        updateProduct,
        deleteProduct } = require('../controllers/product');

router.get('/productlines', auth.authenticationToken, productLines);
router.get('/productline/:productline', auth.authenticationToken, productLine);
router.post('/productline/add', auth.authenticationToken, addProductLine);
router.post('/productline/update/:productline', auth.authenticationToken, updateProductLine);
router.get('/all', auth.authenticationToken, allProducts);
router.get('/:productCode', auth.authenticationToken, singleProduct);
router.post('/add', auth.authenticationToken, addProducts);
router.post('/update/:productCode', auth.authenticationToken, updateProduct);
router.post('/delete/:productCode', deleteProduct);



module.exports = router;