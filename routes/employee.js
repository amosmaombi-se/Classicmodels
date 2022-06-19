const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {getAllEmployees,createEmployees,getSingleEmployee,updateEmployee,deleteEmployee} = require('../controllers/employees');

router.get('/all',getAllEmployees);
router.post('/createEmployees',auth.authenticationToken,createEmployees);
router.get('/:employeeNumber',getSingleEmployee);
router.post('/update/:employeeNumber',auth.authenticationToken,updateEmployee);
router.post('/delete/:employeeNumber',auth.authenticationToken,deleteEmployee);


module.exports = router;