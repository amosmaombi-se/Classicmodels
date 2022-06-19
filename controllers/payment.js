const connection = require('../connection');

const getAllPayments = (req, res) => {
    var query = "select p.*,c.*,e.* from payments p join customers c on p.customerNumber=c.customerNumber join employees e on e.employeeNumber = c.salesRepEmployeeNumber";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const getAllPaymentsByCustomer = (req, res) => {
    customerNumber = req.params.customerNumber
    var query = "select p.*,c.*,e.* from payments p join customers c on p.customerNumber=c.customerNumber join employees e on e.employeeNumber = c.salesRepEmployeeNumber where p.customerNumber=?";
    connection.query(query,[customerNumber],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const getAllPaymentsByOrder = (req, res) => {
    customerNumber = req.params.customerNumber
    orderNumber = req.params.orderNumber
    var query = "select p.*,c.*,e.*,o.* from payments p join customers c on p.customerNumber=c.customerNumber join employees e on e.employeeNumber = c.salesRepEmployeeNumber join orders o on o.customerNumber=c.customerNumber where c.customerNumber=? and o.orderNumber=?";
    connection.query(query,[customerNumber,orderNumber],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


module.exports = {
    getAllPayments,
    getAllPaymentsByCustomer,
    getAllPaymentsByOrder
  };