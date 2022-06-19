const connection = require('../connection');

const getAllOrders = (req, res) => {
    var query = "select * from orders order by orderNumber";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const getOrderByProduct = (req, res) => {
    orderNumber = req.params.orderNumber 
    productCode = req.params.productCode 
    var query = "select o.*,c.*,p.*,e.* from orders o join customers c on c.customerNumber=o.customerNumber join orderdetails d on d.orderNumber=o.orderNumber join products p on p.productCode = d.productCode join employees e on e.employeeNumber=c.salesRepEmployeeNumber where o.orderNumber=? and p.productCode=?";
    connection.query(query,[orderNumber,productCode],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const createOrder = () =>{
    order = req.body
    var query = "insert into orders(orderNumber,orderDate,requiredDate,shippedDate,status,comments,customerNumber) values (?,?,?,?,?,?,?)";
    connection.query(query,[order.orderNumber,order.orderDate,order.requiredDate,order.shippedDate,order.status,order.comments,order.customerNumber], (err, results) => {
        if(!err){
            return res.status(200).json({message:'order created successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


const updateOrder = () =>{
    orderNumber = req.params.orderNumber
    order = req.body
    var query = "update orders set orderDate=?,requiredDate=?,shippedDate=?,status=?,comments=?,customerNumber=? where orderNumber =?";
    connection.query(query,[order.orderDate,order.requiredDate,order.shippedDate,order.status,order.comments,order.customerNumber,orderNumber], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'order code does not found'});
            }
            return res.status(200).json({message:'order updated successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}

const deleteOrder = (req,res) => {
    orderNumber = req.params.orderNumber
    var query = "delete from orders where orderNumber =?";
    connection.query(query,[orderNumber], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'order number does not found'});
            }
            return res.status(200).json({message:'Order Deleted successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


module.exports = {
    getAllOrders,
    getOrderByProduct,
    updateOrder,
    deleteOrder,
    createOrder
  };