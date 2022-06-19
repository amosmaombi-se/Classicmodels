const connection = require('../connection');

const allCustomers = (req, res) => {
    var query = "select * from customers order by customerNumber";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


const singleCustomer = (req,res) => {
    customerNumber = req.params.customerNumber
    var query = "select c.*,e.firstName as sales_person,e.email as sales_person_email from customers c left join employees e on e.employeeNumber = c.salesRepEmployeeNumber where c.customerNumber = ?";
    connection.query(query,[customerNumber],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


const addCustomer = (req,res) => {
    let customer = req.body;
    var query = "insert into customers(customerNumber,customerName,contactFirstName,contactLastName,phone,addressLine1,addressLine2,city,state,postalCode,country,salesRepEmployeeNumber,creditLimit) values(?,?,?,?,?,?,?,?,?,?,?,?,?) ";
    connection.query(query,[customer.customerNumber,customer.customerName,customer.contactFirstName,customer.contactLastName,customer.phone,customer.addressLine1,customer.addressLine2,customer.city,customer.state,customer.postalCode,customer.country,customer.salesRepEmployeeNumber,customer.creditLimit], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "customer added successfully" });
        } else {
          return res.status(500).json(err);
        }
      })
  }

  const allOrders = (req,res) => {
    var query = "select * from orders o join orderdetails d on d.orderNumber = o.orderNumber join customers c on o.customerNumber = c.customerNumber  join products p on p.productCode = d.productCode order by o.orderNumber";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
     } else{
        return res.status(500).json(err);
     }
    })
  }

  const singleOrder = (req,res) => {
    orderNumber = req.params.orderNumber
    var query = "select * from orders o join orderdetails d on d.orderNumber = o.orderNumber join customers c on o.customerNumber = c.customerNumber  join products p on p.productCode = d.productCode where o.orderNumber=?";
    connection.query(query,[orderNumber],(err,results) => {
    if(!err){
        return res.status(200).json(results);
     } else{
        return res.status(500).json(err);
     }
    })
  }


module.exports = {
    allCustomers,
    singleCustomer,
    addCustomer,
    allOrders,
    singleOrder
  };