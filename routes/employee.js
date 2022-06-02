const express = require('express');
const router = express.Router();

const {getAllEmployees} = require('../controllers/employees');

router.get('/all',getAllEmployees);


module.exports = router;