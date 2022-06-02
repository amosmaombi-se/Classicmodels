const express = require('express');
var cors = require('cors');


const empRoute = require('./routes/employee');
const userRoute = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/employee',empRoute);
app.use('/user',userRoute);

module.exports = app;