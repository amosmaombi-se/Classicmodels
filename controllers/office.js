const connection = require('../connection');

const getAllOffices = (req, res) => {
    var query = "select * from offices order by officeCode";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const getSingleOffice = (req, res) => {
    officeCode = req.params.officeCode 
    var query = "select * from offices where officeCode=?";
    connection.query(query,[officeCode],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const createOffice = () =>{
    office = req.body
    var query = "insert into offices(officeCode,city,phone,addressLine1,addressLine2,state,country,postalCode,territory) values (?,?,?,?,?,?,?,?,?)";
    connection.query(query,[office.officeCode,office.city,office.phone,office.addressLine1,office.addressLine2,office.state,office.country,office.postalCode,office.territory], (err, results) => {
        if(!err){
            return res.status(200).json({message:'office created successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


const updateOffice = () =>{
    officeCode = req.params.officeCode
    office = req.body
    var query = "update office set city=?,phone=?,addressLine1=?,addressLine2=?,state=?,country=?,postalCode=?,territory=? where officeCode =?";
    connection.query(query,[office.city,office.phone,office.addressLine1,office.addressLine2,office.state,office.country,office.postalCode,office.territory,officeCode], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'Office code does not found'});
            }
            return res.status(200).json({message:'Office updated successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}

const deleteOffice = (req,res) => {
    officeCode = req.params.officeCode
    var query = "delete from offices where officeCode =?";
    connection.query(query,[officeCode], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'Office code does not found'});
            }
            return res.status(200).json({message:'Office Deleted successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


module.exports = {
    getAllOffices,
    getSingleOffice,
    updateOffice,
    deleteOffice,
    createOffice
  };