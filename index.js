const express = require('express');
var cors = require('cors');
const empRoute = require('./routes/employee');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order'); 
const paymentRoute = require('./routes/payment'); 
const officeRoute = require('./routes/office'); 

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/employee',empRoute);
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/customer',customerRoute);
app.use('/order',orderRoute);
app.use('/payment',paymentRoute);
app.use('/office',officeRoute);

module.exports = app;