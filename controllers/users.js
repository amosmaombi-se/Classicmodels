const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config();

const signUp = async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(10)
  const password = req.body.password;    
  const encryptedPassword = await  bcrypt.hash(password, salt)
  query = "select email,password,role,status from users where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query = "insert into users(fullname,phone,email,address,password,status,role) values(?,?,?,?,?,'false','user')";
        connection.query(query, [user.fullname, user.phone, user.email, user.address, encryptedPassword,user.role], (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Successfully Registered" });
          }
          else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({ message: "User Already exists" });
      }
    } else {
      return res.status(500).json(err);
    }
  })
}


const login = async (req, res) => {
  const user = req.body;
  const password = req.body.password; 
  query = "select email,password,role,status from users where email=?";
  connection.query(query, [user.email,user.role], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(401).json({ message: "Incorrect username or password" });
      }
     
      else if (results.length > 0) {
        const comparison = bcrypt.compare(password, results[0].password)
        if(comparison){
            const response = { email: results[0].email, role: results[0].role }
            const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '30d' })
            res.status(200).json({ token: accessToken});
        }else{
          res.status(204).json({message:"Email and password does not match" })                
         
        }
      
      }
      else {
        return res.status(400).json({ message: "Something went wrong.Please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  })
}


const allUsers = (req, res) => {
  var query = "select id,fullname,email,phone,status,address,role from users where role = 'user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
}


const updateUser = (req, res) => {
  let user = req.body;
  var query = "update users set status = ? where id = ?";
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(400).json({ message: 'User does not exists' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    } else {
      return res.status(500).json(err);
    }
  })
}


const checkToken = (req, res) => {
  return res.status(200).json({ message: 'true' });
}

const changePassword = (req, res) => {
  const user = req.body;
  const email = res.locals.email;
  var query = 'select * from users where email=? and password=?';
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect Old password" });
      } else if (results[0].password == user.oldPassword) {
        query = "update users set password=? where email=?";
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Password updated successfully" });
          } else {
            return res.status(500).json(err);
          }
        })
      } else {
        return res.status(400).json({ message: "Something went wrong,please try again" });
      }
    } else {
      return res.status(500).json(err);
    }
  })
}


module.exports = {
  signUp,
  login,
  allUsers,
  updateUser,
  checkToken,
  changePassword
};