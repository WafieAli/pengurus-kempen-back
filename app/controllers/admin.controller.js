const db = require("../models");
const config = require("../config/auth.config");
const { request } = require("express");
const User = db.user_table;//user model
const Op = db.Sequelize.Op;


exports.adminHome = (req, res) => {
  res.status(200).send("Admin home page");
};
exports.adminProfile = (req, res) => {
  res.status(200).send("Admin Profile");
};

exports.getInfo = (req, res, next) => {

  User.findByPk(req.body.request_body.user.id).then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }else{
          if(req.body.request_body.info == "createdAt"){
            res.status(200).send(
              {
                message: user.createdAt
              }
            );          
          }
          else if(req.body.request_body.info == "password"){
            res.status(200).send(
              {
                message: user.password
              }
            );          
          }
          else{// if you send the request with no options selected, you won't get any response and can check the timeout
          // res.status(200).send(
            //  {
            //    message: "Please Ask Properly !!!!!!!!!!!"
            //  }
            //);   
          }
        }
      }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAllUsers = (req, res, next) => {
        User.findAll({
          attributes: ['username'],
          where: {
            username: {
            
              [Op.like]: '%'+req.body.request_body.query+'%'
    
            }
          }
        }).then(usernames => {
          if (usernames) {
            usernames = JSON.stringify(usernames); 
            res.status(200).send({
                message: usernames//all_usernames
              });
            return;
          }else{
            res.status(200).send({
              message: ""
            });
            return;        
          }
        }).catch(err => {
          res.status(500).send({ message: err.message });
      });
    
};
