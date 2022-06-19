const connection = require('../connection');

const getAllEmployees = (req, res) => {
    var query = "select e.*,o.* from employees e join offices o on o.officeCode=e.officeCode order by e.employeeNumber";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


const getSingleEmployee = (req, res) => {
    employeeNumber = req.params.employeeNumber 
    var query = "select e.*,o.* from employees e join offices o on o.officeCode=e.officeCode where e.employeeNumber=?";
    connection.query(query,[employeeNumber],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const deleteEmployee = (req,res) => {
    employeeNumber = req.params.employeeNumber
    var query = "delete from employees where employeeNumber =?";
    connection.query(query,[employeeNumber], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'employee code does not found'});
            }
            return res.status(200).json({message:'employee Deleted successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


const createEmployees = () =>{
    employee = req.body
    var query = "insert into employees(employeeNumber,lastName,firstName,extension,email,officeCode,reportsTo,jobTitle) values (?,?,?,?,?,?,?,?,)";
    connection.query(query,[employee.employeeNumber,employee.lastName,employee.firstName,employee.extension,employee.email,employee.officeCode,employee.reportsTo,employee.jobTitle], (err, results) => {
        if(!err){
            return res.status(200).json({message:'employee created successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


const updateEmployee = () =>{
    employeeNumber = req.params.employeeNumber
    employee = req.body
    var query = "update employees set lastName=?,firstName=?,extension=?,email=?,officeCode=?,reportsTo=?,jobTitle=? where employeeNumber =?";
    connection.query(query,[employee.lastName,employee.firstName,employee.extension,employee.email,employee.officeCode,employee.reportsTo,employee.jobTitle,employeeNumber], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'employee number does not found'});
            }
            return res.status(200).json({message:'employee updated successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}

module.exports = {
    getAllEmployees,
    deleteEmployee,
    createEmployees,
    getSingleEmployee,
    updateEmployee
  };