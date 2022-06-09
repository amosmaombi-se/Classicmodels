const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

const {signUp,login,allUsers,updateUser,checkToken,changePassword} = require('../controllers/users');

router.post('/signup',signUp);
router.post('/login',login);
router.get('/all',auth.authenticationToken,allUsers);
router.patch('/update',auth.authenticationToken,updateUser);
router.get('/token',auth.authenticationToken,checkToken);
router.post('/changepassword',auth.authenticationToken,changePassword);

module.exports = router;