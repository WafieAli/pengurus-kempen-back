const db = require("../models");
const User = db.user_table;//user model
const { request } = require("express");

exports.getAcc = (req, res, next) => {
  User.findByPk(req.body.request_body.user.id).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    } else{
      res.status(200).send({ 
        message: user
      });
     }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message });
  });
};

exports.updAcc = (req, res) => {
  const id = req.body.request_body.user.id
  const username = req.body.request_body.user.username
  User.update(req.body.request_body.data, {where: {id: id}}).then(num => { //update user_table and respond to views.
    if (num == 1) {
        res.send({
          message: "Account was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update account for User " + username + ". Maybe User was not found or request data is empty!"
        });
      }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message });
  });
};
