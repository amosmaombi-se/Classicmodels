const connection = require('../connection');

const getAllEmployees = (req, res) => {
    var query = "select * from employees";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


module.exports = {
    getAllEmployees,
  };