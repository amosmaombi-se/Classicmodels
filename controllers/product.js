const connection = require('../connection');

const productLines = (req, res) => {
    var query = "select * from productlines order by productLine";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const productLine = (req, res) => {
    productine = req.params.productline
    var query = "select * from productlines where productLine = ?";
    connection.query(query,[productine],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}


const addProductLine = (req,res) => {
    let productline = req.body;
    let image = req.body.image;
    var query = "insert into productlines(productLine,textDescription,htmlDescription,image) values(?,?,?,?) ";
    connection.query(query,[productline.productLine,productline.textDescription,productline.htmlDescription,image], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "productline successfully added" });
        } else {
          return res.status(500).json(err);
        }
      })
}


const updateProductLine = (req,res) => {
    productline_name = req.params.productline
    productline = req.params.productline
    var query = "update productlines set productLine = ?,textDescription=? where productLine = ?";
    connection.query(query,[productine.productLine,productline.textDescription,productine_name],(err,results) => {
    if(!err){
        if(results.affectedRows == 0){
          return res.status(404).json({message:'Product line does not found'});
        }
        return res.status(200).json({message:'Product line updated successfully'});
    } else{
        return res.status(500).json(err);
    }
   })
}


const allProducts = (req,res) => {
    var query = "select p.*,pl.* from productlines pl join products p on p.productLine = pl.productLine";
    connection.query(query,(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const singleProduct = (req,res) => {
    productCode = req.params.productCode
    var query = "select p.*,pl.* from productlines pl join products p on p.productLine = pl.productLine where p.productCode=?";
    connection.query(query,[productCode],(err,results) => {
    if(!err){
        return res.status(200).json(results);
    } else{
        return res.status(500).json(err);
    }
   })
}

const addProducts = (req,res) => {
    let product = req.body;
    var query = "insert into products(productCode,productName,productLine,productScale,productVendor,productDescription,quantityInStock,buyPrice,MSRP) values(?,?,?,?) ";
    connection.query(query,[product.productCode,product.productName,product.productLine,product.productScale,product.productVendor,product.productDescription,product.quantityInStock,product.buyPrice,product.MSRP], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "product added successfully" });
        } else {
          return res.status(500).json(err);
        }
      })
}

const updateProduct = (req,res) => {
    productcode = req.params.productline
    product = req.body
    var query = "update products set productName=?,productLine=?,productScale=?,productVendor=?,productDescription=?,quantityInStock=?,buyPrice=?,MSRP=? where productCode =?";
    connection.query(query,[product.productName,product.productLine,product.productScale,product.productVendor,product.productDescription,product.quantityInStock,product.buyPrice,product.MSRP,productcode], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'Product code does not found'});
            }
            return res.status(200).json({message:'Product updated successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}

const deleteProduct = (req,res) => {
    productcode = req.params.productCode
    var query = "delete from products where productCode =?";
    connection.query(query,[productcode], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
              return res.status(404).json({message:'Product code does not found'});
            }
            return res.status(200).json({message:'Product Deleted successfully'});
        } else{
            return res.status(500).json(err);
        }
    })
}


module.exports = {
    productLines,
    productLine,
    addProductLine,
    updateProductLine,
    allProducts,
    singleProduct,
    addProducts,
    updateProduct,
    deleteProduct
  };